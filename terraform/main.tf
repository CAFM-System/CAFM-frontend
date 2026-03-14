terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    http = {
      source  = "hashicorp/http"
      version = "~> 3.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# Auto fetch default VPC
data "aws_vpc" "default" {
  default = true
}

# Auto fetch default subnets
data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

# Auto fetch your current public IP
data "http" "my_ip" {
  url = "https://checkip.amazonaws.com"
}

# Security Group
resource "aws_security_group" "cafm_frontend_sg" {
  name        = "cafm-frontend-sg"
  description = "Security group for CAFM frontend server"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["${chomp(data.http.my_ip.response_body)}/32"]
  }

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "App Port"
    from_port   = 5173
    to_port     = 5173
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "cafm-frontend-sg"
    Environment = "production"
    Project     = "CAFM"
  }
}

# EC2 Instance
resource "aws_instance" "cafm_frontend" {
  ami                    = var.ami_id
  instance_type          = var.instance_type
  key_name               = var.key_pair_name
  subnet_id              = data.aws_subnets.default.ids[0]
  vpc_security_group_ids = [aws_security_group.cafm_frontend_sg.id]

  root_block_device {
    volume_size = 20
    volume_type = "gp3"
  }

  user_data = <<-EOF
    #!/bin/bash
    apt-get update -y
    apt-get install -y docker.io
    systemctl start docker
    systemctl enable docker
    usermod -aG docker ubuntu
  EOF

  tags = {
    Name        = "CAFM-frontend"
    Environment = "production"
    Project     = "CAFM"
  }
}

# Elastic IP
resource "aws_eip" "cafm_frontend_eip" {
  instance = aws_instance.cafm_frontend.id
  domain   = "vpc"

  tags = {
    Name        = "CAFM-frontend-eip"
    Environment = "production"
    Project     = "CAFM"
  }
}