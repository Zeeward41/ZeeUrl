# Get Route53 hosted Zone
data "aws_route53_zone" "zeeurl_hosted_zone" {
  name = var.web_site
}

# DNS Record
resource "aws_route53_record" "zeeurl_cert_dns" {
  allow_overwrite = true
  name            = tolist(aws_acm_certificate.zeeurl_acm.domain_validation_options)[0].resource_record_name

  records = [tolist(aws_acm_certificate.zeeurl_acm.domain_validation_options)[0].resource_record_value]

  type = tolist(aws_acm_certificate.zeeurl_acm.domain_validation_options)[0].resource_record_type

  zone_id = data.aws_route53_zone.zeeurl_hosted_zone.zone_id
  ttl     = 60
}

resource "aws_route53_record" "zeeurl_dns" {
  zone_id = data.aws_route53_zone.zeeurl_hosted_zone.id
  name    = var.web_site
  type    = "A"

  alias {
    name                   = aws_lb.k8s_ingress_alb.dns_name
    zone_id                = aws_lb.k8s_ingress_alb.zone_id
    evaluate_target_health = true
  }
}