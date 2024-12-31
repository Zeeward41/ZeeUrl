resource "local_file" "private_key" {
    content = tls_private_key.ssh_key.private_key_pem
    filename = "private_key.pem"
}

# resource "local_file" "master_ip" {
#     content =   aws_instance.master_kubernetes.public_ip 
#     filename = "master_ip.txt"
# }
resource "local_file" "dns_master" {
    content =   aws_instance.master_kubernetes.public_dns 
    filename = "dns_master.txt"
}

resource "local_file" "sg_kubernetes_name" {
    content = aws_security_group.kubernetes_servers.name
    filename = "sg_kubernetes_name.txt"
}