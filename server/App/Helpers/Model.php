<?php
namespace App\Helpers;

use App\Config\Connect;

abstract class Model 
{
    private function execute(string $query, array $binds = []): \PDOStatement
    {
        try {
            $stmt = Connect::getInstance()->prepare($query);

            if (count($binds) > 0) {
                foreach ($this->filter($binds) as $key => $value) {
                    $stmt->bindValue(":$key", $value);
                }
            }

            $stmt->execute();

            return $stmt;
        } catch (\PDOException $e) {
            http_response_code(500);
            // echo $e->getMessage();
            die(json_encode(Messages::setMessage("error", "Houve algum problema no servidor. Tente novamente mais tarde!")));
        }
    }

    protected function create(string $entity, array $data): bool
    {
        $columns = implode(", ", array_keys($data));
        $values = ":" . implode(", :", array_keys($data));

        $sql = "INSERT INTO {$entity} ({$columns}) VALUES ({$values})";

        $this->execute($sql, $data);

        return true;
    }

    protected function read(string $entity, string $fields = "*", string $terms = null, array $params = []): ?\PDOStatement
    {
        $where = (!$terms ? "" : "WHERE {$terms}");

        $sql = "SELECT {$fields} FROM {$entity} {$where}";

        return $this->execute($sql, $params);
    }

    protected function update(string $entity, array $data, string $terms, array $params): bool
    {
        $dateSet = [];

        foreach ($data as $bind => $value) {
            $dateSet[] = "{$bind} = :{$bind}";
        }

        $dateSet = implode(", ", $dateSet);

        $sql = "UPDATE {$entity} SET {$dateSet} WHERE {$terms}";

        $values = array_merge($data, $params);

        $this->execute($sql, $values);

        return true;
    }

    protected function delete(string $entity, string $terms, array $params): bool
    {
        $sql = "DELETE FROM {$entity} WHERE {$terms}";

        $this->execute($sql, $params);

        return true;
    }

    private function filter(array $data): ?array
    {
        $filter = [];
        foreach ($data as $key => $value) {
            $filter[$key] = (is_null($value) ? null : filter_var($value, FILTER_SANITIZE_SPECIAL_CHARS));
        }
        return $filter;
    }
}
