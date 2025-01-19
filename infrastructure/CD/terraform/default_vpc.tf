#### Get default VPC

data "aws_vpc" "default" {
  default = true
}

#### GET subnets default VPC
data "aws_subnets" "default_vpc_subnets" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

#### 

