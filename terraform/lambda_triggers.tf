resource "aws_lambda_permission" "lambda_permission_discover_mutants_post_rest" {
  depends_on    = [aws_lambda_function.discover_mutants_lambda]
  principal     = "apigateway.amazonaws.com"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.discover_mutants_lambda.function_name
  source_arn = "${aws_api_gateway_rest_api.rest_api.execution_arn}/*/${aws_api_gateway_method.discover_mutants_post_method.http_method}${aws_api_gateway_resource.discover_mutants_resource.path}"
}

resource "aws_lambda_permission" "lambda_permission_person_get_rest" {
  depends_on    = [aws_lambda_function.get_stadistics_mutants_lambda]
  principal     = "apigateway.amazonaws.com"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.get_stadistics_mutants_lambda.function_name
  source_arn = "${aws_api_gateway_rest_api.rest_api.execution_arn}/*/${aws_api_gateway_method.get_stadistics_mutants_get_method.http_method}${aws_api_gateway_resource.get_stadistics_mutants_resource.path}"
}
