# EC2 Instance
## Security Groupe ALL/ALL
resource "aws_security_group" "kubernetes_servers" {
  name        = "kubernetes-servers-sg"
  description = "Security Group for Kubernetes Servers"
}

# Ingress rule
resource "aws_vpc_security_group_ingress_rule" "allow_me_ssh_kubernetes" {
  security_group_id = aws_security_group.kubernetes_servers.id
  from_port         = 22
  to_port           = 22
  ip_protocol       = "tcp"
  cidr_ipv4         = var.mon_ip
}

# Ingress rule ####################### A DELETE
resource "aws_vpc_security_group_ingress_rule" "allow_only_loadBalancer" {
  security_group_id = aws_security_group.kubernetes_servers.id
  ip_protocol       = "tcp"
  from_port = var.ingress_port
  to_port = var.ingress_port
  referenced_security_group_id = aws_security_group.k8s_ingress_alb_SG.id
}

resource "aws_vpc_security_group_ingress_rule" "allow_traffic_in_cluster" {
  security_group_id = aws_security_group.kubernetes_servers.id
  #   from_port         = 0
  #   to_port           =  0
  ip_protocol                  = "-1"
  referenced_security_group_id = aws_security_group.kubernetes_servers.id
}


# Egress rule
resource "aws_vpc_security_group_egress_rule" "allow_all_outbound_Kubernetes" {
  security_group_id = aws_security_group.kubernetes_servers.id
  #   from_port         = 0
  #   to_port           = 0
  ip_protocol = "-1" # Allow all protocols
  cidr_ipv4   = "0.0.0.0/0"
}

## Public Instance
resource "aws_instance" "master_kubernetes" {
  ami                         = var.ami_instance
  instance_type               = var.instance_type_master
  associate_public_ip_address = true

  root_block_device {
    volume_size           = 15
    volume_type           = "gp3"
    delete_on_termination = true
    encrypted             = true
  }

  #ssh
  key_name = aws_key_pair.key_cd_kubernetes.key_name

  # Attach the security group
  vpc_security_group_ids = [aws_security_group.kubernetes_servers.id]

  tags = {
    Name = "Kubernetes Master"
  }
}
