<?php
namespace App\Helpers;

class Messages 
{
    private static string $status;
    private static string $message;
    private static array $response;

    public static function setMessage(string $status, string $message): array
    {
        self::$status = $status;
        self::$message = $message;

        self::$response = [
            "status" => self::$status,
            "message" => self::$message
        ];

        return self::$response;
    }
}
