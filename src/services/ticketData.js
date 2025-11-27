const ticketData = [
  {
    id: 1,
    ticket_number: "TCK-001",
    status: "assigned",
    priority: "high",
    title: "AC Not Cooling",
    description: "Air conditioner in room 204 is not cooling properly.",
    category: "electrical",
    location: "Room 204",
    tenant_name: "John Doe",
    created_at: "2025-02-20"
  },
  {
    id: 2,
    ticket_number: "TCK-002",
    status: "in_progress",
    priority: "medium",
    title: "Water Leakage",
    description: "Leak under the kitchen sink.",
    category: "plumbing",
    location: "Block B - Kitchen",
    tenant_name: "Emma Smith",
    created_at: "2025-02-18"
  },
  {
    id: 3,
    ticket_number: "TCK-003",
    status: "completed",
    priority: "low",
    title: "Wall Painting",
    description: "Need repainting due to wall cracks.",
    category: "general_maintenance",
    location: "Hallway 3",
    tenant_name: "David Lee",
    created_at: "2025-02-10"
  },

  // EXTRA SAMPLE TICKETS
  {
    id: 4,
    ticket_number: "TCK-004",
    status: "assigned",
    priority: "urgent",
    title: "Power Outage",
    description: "Complete power failure in Block C.",
    category: "electrical",
    location: "Block C",
    tenant_name: "Mark Wilson",
    created_at: "2025-02-22"
  },
  {
    id: 5,
    ticket_number: "TCK-005",
    status: "assigned",
    priority: "high",
    title: "Broken Window",
    description: "Glass window cracked due to wind.",
    category: "general_maintenance",
    location: "Room 310",
    tenant_name: "Lisa Turner",
    created_at: "2025-02-19"
  },
  {
    id: 6,
    ticket_number: "TCK-006",
    status: "in_progress",
    priority: "medium",
    title: "Clogged Drain",
    description: "Bathroom drain blocked and overflowing.",
    category: "plumbing",
    location: "Room 118",
    tenant_name: "Noah Anderson",
    created_at: "2025-02-16"
  },
  {
    id: 7,
    ticket_number: "TCK-007",
    status: "completed",
    priority: "low",
    title: "Fan Making Noise",
    description: "Ceiling fan producing rattling noise.",
    category: "electrical",
    location: "Room 501",
    tenant_name: "Sophia Charles",
    created_at: "2025-02-12"
  },
  {
    id: 8,
    ticket_number: "TCK-008",
    status: "assigned",
    priority: "urgent",
    title: "Security Camera Down",
    description: "Main entrance CCTV not functioning.",
    category: "security",
    location: "Front Gate",
    tenant_name: "Building Admin",
    created_at: "2025-02-21"
  },
  {
    id: 9,
    ticket_number: "TCK-009",
    status: "completed",
    priority: "low",
    title: "Pest Issue",
    description: "Ants found inside kitchen pantry.",
    category: "pest_control",
    location: "Block A - Shared Kitchen",
    tenant_name: "Ella Brown",
    created_at: "2025-02-11"
  },
  {
    id: 10,
    ticket_number: "TCK-010",
    status: "in_progress",
    priority: "high",
    title: "Door Lock Broken",
    description: "Main door lock jammed and not closing properly.",
    category: "security",
    location: "Room 207",
    tenant_name: "Oliver Grant",
    created_at: "2025-02-14"
  },
  {
    id: 11,
    ticket_number: "TCK-011",
    status: "assigned",
    priority: "medium",
    title: "AC Gas Refill",
    description: "AC gas level seems low, cooling reduced.",
    category: "hvac",
    location: "Room 410",
    tenant_name: "Hannah Green",
    created_at: "2025-02-15"
  },
  {
    id: 12,
    ticket_number: "TCK-012",
    status: "completed",
    priority: "urgent",
    title: "Smoke Detector Alarm",
    description: "Smoke detector beeping continuously.",
    category: "security",
    location: "Block D - 2nd Floor",
    tenant_name: "Property Manager",
    created_at: "2025-02-09"
  }
];

export default ticketData;
