<?php
namespace App\Models;

use App\Helpers\Messages;
use App\Helpers\Model;

class UserModels extends Model 
{
    public function register($data): array
    {
        foreach ($data as $key => $value) {
            $data[$key] = strip_tags($value);
        }

        $params = [
            $data["name"],
            $data["cpf"],
            $data["date_birth"],
            $data["local"],
            $data["uf"],
            $data["gender"],
            $data["marital_status"],
            $data["name_mother"]
        ];

        $sql = "INSERT INTO cadastro_usuarios (nome, cpf, data_nascimento, local_nascimento, uf, sexo, estado_civil, nome_mae) VALUES(?,?,?,?,?,?,?,?)";

        $this->execute($sql, [], $params);

        return Messages::setMessage("success", "Cadastro realizado com sucesso!");
    }

    public function dashboard($searchUserByName): array
    {
        if ($searchUserByName) {
            $sql = "SELECT id_usuario, nome, cpf, data_nascimento, sexo FROM cadastro_usuarios WHERE nome LIKE '%$searchUserByName%'";
        } else {
            $sql = "SELECT id_usuario, nome, cpf, data_nascimento, sexo FROM cadastro_usuarios";
        }

        $stmt = $this->execute($sql);

        return $stmt->fetchAll();
    }

    public function userByID($id): array
    {
        $sql = "SELECT * FROM cadastro_usuarios WHERE id_usuario = :id_usuario";

        $stmt = $this->execute($sql, [":id_usuario" => $id]);

        $row = $stmt->rowCount();

        if ($row == 0) return Messages::setMessage("error", "Usuário não encontrado!");

        return $stmt->fetch();
    }

    public function update($id, $data): array
    {
        foreach ($data as $key => $value) {
            $data[$key] = strip_tags($value);
        }

        $sql = "UPDATE cadastro_usuarios SET nome = :nome, cpf = :cpf, data_nascimento = :data_nascimento, local_nascimento = :local_nascimento, 
        uf = :uf, sexo = :sexo, estado_civil = :estado_civil, nome_mae = :nome_mae WHERE id_usuario = :id_usuario";

        $stmt = $this->execute($sql, [
            ":id_usuario" => $id,
            ":nome" => $data["name"],
            ":cpf" => $data["cpf"],
            ":data_nascimento" => $data["date_birth"],
            ":local_nascimento" => $data["local"],
            ":uf" => $data["uf"],
            ":sexo" => $data["gender"],
            ":estado_civil" => $data["marital_status"],
            ":nome_mae" => $data["name_mother"],
        ]);

        return Messages::setMessage("success", "Dados atualizados com sucesso!");
    }

    public function delete($id): array
    {
        $sql = "DELETE FROM cadastro_usuarios WHERE id_usuario = :id_usuario";

        $stmt = $this->execute($sql, [":id_usuario" => $id]);

        return Messages::setMessage("success", "Dados deletados com sucesso!");
    }
}
