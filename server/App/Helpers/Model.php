<?php
namespace App\Helpers;

use App\Config\Connect;

abstract class Model 
{
    private $connection;

    public function __construct()
    {
        $this->connection = Connect::getInstance();
    }

    public function execute(string $query, array $binds = [], $params = null): \PDOStatement
    {
        try {
            $stmt = $this->connection->prepare($query);

            if (count($binds) > 0) {
                foreach ($binds as $key => $value) {
                    $stmt->bindValue($key, $value);
                }
            }

            $stmt->execute($params);

            return $stmt;
        } catch (\PDOException $e) {
            http_response_code(500);
            // echo $e->getMessage();
            die(json_encode(Messages::setMessage("error", "Houve algum problema no servidor. Tente novamente mais tarde!")));
        }
    }
}
