## Public Instance
resource "aws_instance" "node_two_kubernetes" {
  ami                         = var.ami_instance
  instance_type               = var.instance_type_workers
  associate_public_ip_address = true

  root_block_device {
    volume_size = 15
    volume_type = "gp3"
    delete_on_termination = true
    encrypted = true
  }

  #ssh
  key_name = aws_key_pair.key_cd_kubernetes.key_name

  # Attach the security group
  vpc_security_group_ids = [aws_security_group.kubernetes_servers.id]

  tags = {
    Name = "Kubernetes Node2"
  }
}