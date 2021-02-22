resource "aws_dynamodb_table" "adn_table" {
  name           = "adn_table"
  billing_mode   = "PROVISIONED"
  read_capacity  = 5
  write_capacity = 5
  hash_key       = "adn"

  attribute {
    name = "adn"
    type = "S"
  }

}
