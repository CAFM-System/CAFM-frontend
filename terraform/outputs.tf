output "instance_id" {
  description = "EC2 Instance ID"
  value       = aws_instance.cafm_frontend.id
}

output "elastic_ip" {
  description = "Elastic IP of CAFM frontend"
  value       = aws_eip.cafm_frontend_eip.public_ip
}

output "public_dns" {
  description = "Public DNS of CAFM frontend"
  value       = aws_instance.cafm_frontend.public_dns
}

output "security_group_id" {
  description = "Security Group ID"
  value       = aws_security_group.cafm_frontend_sg.id
}