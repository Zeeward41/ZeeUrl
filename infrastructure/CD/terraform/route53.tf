# Get Route53 hosted Zone
data "aws_route53_zone" "zeeurl_hosted_zone" {
  name = var.web_site
  private_zone = false
}

resource "aws_route53_record" "zeeurl_cert_dns" {
  for_each = {
    for dvo in aws_acm_certificate.zeeurl_acm.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = data.aws_route53_zone.zeeurl_hosted_zone.zone_id
}

resource "aws_route53_record" "zeeurl_dns" {
  zone_id = data.aws_route53_zone.zeeurl_hosted_zone.zone_id
  name    = var.web_site
  type    = "A"

  alias {
    name                   = aws_lb.k8s_ingress_alb.dns_name
    zone_id                = aws_lb.k8s_ingress_alb.zone_id
    evaluate_target_health = true
  }
}