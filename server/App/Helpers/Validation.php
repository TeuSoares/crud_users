<?php
namespace App\Helpers;

use App\Helpers\Messages;

class Validation
{
    private static $msg = [];

    public static function checkEmptyFields(array $fields): void
    {
        foreach ($fields as $value) {
            if (empty(trim($value))) array_push(self::$msg, Messages::setMessage("error", "Todos os campos são obrigatórios!")); 
        }
    }

    public static function verifyFieldLength(array $fields): void
    {
        foreach ($fields as $values) {
            $newArray = explode(" ", $values[0]);

            foreach ($newArray as $value) {
                switch ($value) {
                    case $value == "!=":
                        $condition = strlen($newArray[0]) != $newArray[2];
                    break;

                    case $value == "==":
                        $condition = strlen($newArray[0]) == $newArray[2];
                    break;

                    case $value == ">":
                        $condition = strlen($newArray[0]) > $newArray[2];
                    break;

                    case $value == "<":
                        $condition = strlen($newArray[0]) < $newArray[2];
                    break;

                    case $value == ">=":
                        $condition = strlen($newArray[0]) >= $newArray[2];
                    break;

                    case $value == "<=":
                        $condition = strlen($newArray[0]) <= $newArray[2];
                    break;
                }
            }

            if ($condition) array_push(self::$msg, Messages::setMessage("error", $values[1]));
        }
    }

    public static function verifyFieldIsNumeric(array $fields): void
    {
        foreach ($fields as $key => $value) {
            if(!ctype_digit($value)) array_push(self::$msg, Messages::setMessage("error", "O campo $key só pode conter números!"));
        }
    }

    public static function checkDateValid($date, $msg): void
    {
        if ($date) {
            $explode = explode("-", $date);
            $checkDate = checkdate($explode[1], $explode[2], $explode[0]);

            if (!$checkDate) array_push(self::$msg, Messages::setMessage("error", $msg));
        }
    }

    public static function onlyLetters(array $fields): void
    {
        foreach ($fields as $key => $value) {
            if (!preg_match("/^([a-zA-Zà-úÀ-Ú]|\s+)+$/", $value)) array_push(self::$msg, Messages::setMessage("error", "O campo $key só pode conter letras!"));
        }
    }

    public static function setErrors(string $msg): void
    {
        array_push(self::$msg, Messages::setMessage("error", $msg));
    }

    public static function getErrors(): array
    {
        return self::$msg;
    }

    public static function send($errors, $request, $response, $next)
    {
        if (isset($errors[0]["status"]) == "error") {
            return $response->withJson($errors[0], 422);
        }

        return $response = $next($request, $response);
    }
}
