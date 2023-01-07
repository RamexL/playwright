@login
Feature: Login
  As a visitor of the ecommerce website
  I want to be able to login
  @log01
  Scenario Outline: Login user
    Given i open Ztrain login page
    When I enter email address "<email>" and password "<password>"
    And I clicks to the login button
    Then The user is connected with  "Z-Train"
    Examples:
      |          email           |     password      |
      |  ramexdongmo@gmail.com   |   Execution7.     |