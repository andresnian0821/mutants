resource "aws_lambda_function" "discover_mutants_lambda" {
  filename      =  "../services/discover-mutants/dist/discover-mutants.zip"
  function_name = "discover_mutants_lambda"
  role          = aws_iam_role.lambda_role.arn
  handler       = "index.handler"
  source_code_hash = base64sha256("../services/discover-mutants/dist/discover-mutants.zip")
  runtime = "nodejs12.x"

  environment {
    variables = {
      TABLE_ADN_NAME = aws_dynamodb_table.adn_table.name
    }
  }
}

resource "aws_lambda_function" "get_stadistics_mutants_lambda" {
  filename      =  "../services/get-stadistics-mutants/dist/get-stadistics-mutants.zip"
  function_name = "get_stadistics_mutants_lambda"
  role          = aws_iam_role.lambda_role.arn
  handler       = "index.handler"
  source_code_hash = base64sha256("../services/get-stadistics-mutants/dist/get-stadistics-mutants.zip")
  runtime = "nodejs12.x"

  environment {
    variables = {
      TABLE_ADN_NAME = aws_dynamodb_table.adn_table.name
    }
  }
}
