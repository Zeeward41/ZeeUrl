###### Security Group
resource "aws_security_group" "k8s_ingress_alb_SG" {
  name        = "k8s_ingress_alb_SG"
  description = "Security Group for ALB"
}

# Ingress rule
resource "aws_vpc_security_group_ingress_rule" "allow_http_only" {
  security_group_id = aws_security_group.k8s_ingress_alb_SG.id
  from_port         = 80
  to_port           = 80
  ip_protocol       = "tcp"
  cidr_ipv4         = "0.0.0.0/0"
}

# Egress rule
resource "aws_vpc_security_group_egress_rule" "allow_all_http" {
  security_group_id = aws_security_group.k8s_ingress_alb_SG.id
  ip_protocol       = "-1" # Allow all protocols
  cidr_ipv4         = "0.0.0.0/0"
}


##### Target Group
resource "aws_lb_target_group" "k8s_ingress_http" {
  name     = "k8s-ingress-http"
  port     = var.ingress_port
  protocol = "HTTP"
    vpc_id      = data.aws_vpc.default.id
  health_check {
    path                = "/"
    protocol            = "HTTP"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 3
    unhealthy_threshold = 2
  }
}

# Ajouter les instances au Target Group
resource "aws_lb_target_group_attachment" "worker_1" {
  target_group_arn = aws_lb_target_group.k8s_ingress_http.arn
  target_id        =  aws_instance.node_one_kubernetes.id
  port             = var.ingress_port
}

resource "aws_lb_target_group_attachment" "worker_2" {
  target_group_arn = aws_lb_target_group.k8s_ingress_http.arn
  target_id        = aws_instance.node_two_kubernetes.id
  port             = var.ingress_port
}

##### Load Balancer
resource "aws_lb" "k8s_ingress_alb" {
  name               = "k8s-ingress-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.k8s_ingress_alb_SG.id]
  subnets            = data.aws_subnets.default_vpc_subnets.ids
}

##### Listener
resource "aws_lb_listener" "http_listener" {
  load_balancer_arn = aws_lb.k8s_ingress_alb.arn
  port              = 80
  protocol          = "HTTP"
  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.k8s_ingress_http.arn
  }
}