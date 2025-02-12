# EC2 Instance
## Security Groupe ALL/ALL
resource "aws_security_group" "jenkins" {
  name        = "jenkins-SG"
  description = "Security Group for Jenkins Server"
}

# Ingress rule
resource "aws_vpc_security_group_ingress_rule" "allow_me_ssh_jenkins" {
  security_group_id = aws_security_group.jenkins.id
  from_port         = 22
  to_port           = 22
  ip_protocol       = "tcp"
  cidr_ipv4 = var.mon_ip
}

# Ingress rule
resource "aws_vpc_security_group_ingress_rule" "allow_me_jenkins" {
  security_group_id = aws_security_group.jenkins.id
  from_port         = 8080
  to_port           = 8080
  ip_protocol       = "tcp"
  cidr_ipv4 = var.mon_ip
}

# Egress rule
resource "aws_vpc_security_group_egress_rule" "allow_all_outbound_jenkins" {
  security_group_id = aws_security_group.jenkins.id
  #   from_port         = 0
  #   to_port           = 0
  ip_protocol = "-1" # Allow all protocols
  cidr_ipv4   = "0.0.0.0/0"
}

## Public Instance
resource "aws_instance" "jenkins_public_server" {
  ami                         = var.ami_instance
  instance_type               = var.instance_type
  associate_public_ip_address = true

  #ssh
  key_name = aws_key_pair.key_ci_Zeeurl.key_name

  # Attach the security group
  vpc_security_group_ids = [aws_security_group.jenkins.id]

  tags = {
    Name = "Jenkins Server"
  }
}
