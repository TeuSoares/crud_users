<?php

namespace App\Config;

use \PDO;
use \PDOException;

$dotenv = \Dotenv\Dotenv::createImmutable(__DIR__ . "/../../");
$dotenv->load();

class Connect
{
    private static $host;
    private static $dbname;
    private static $username;
    private static $password;

    private static $options = [
        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8",
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_CASE => PDO::CASE_NATURAL
    ];

    private static $instance;

    /**
     * @return PDO
     */
    public static function getInstance(): PDO
    {
        if (empty(self::$instance)) {
            self::$host = $_ENV["DB_HOST"];
            self::$dbname = $_ENV["DB_NAME"];
            self::$username = $_ENV["DB_USERNAME"];
            self::$password = $_ENV["DB_PASSWORD"];

            try {
                self::$instance = new PDO(
                    "mysql:host=" . self::$host . ";dbname=" . self::$dbname,
                    self::$username,
                    self::$password,
                    self::$options
                );
            } catch (PDOException $e) {
                die('ERROR: ' . $e->getMessage());
            }
        }

        return self::$instance;
    }

    final private function __construct()
    {
    }

    final private function __clone()
    {
    }
}
