<?php
namespace App\Models;

use App\Helpers\Messages;
use App\Helpers\Model;

class UserModels extends Model
{
    public function register(array $data): array
    {
        $params = [
            "nome" => $data["name"],
            "cpf" => $data["cpf"],
            "data_nascimento" => $data["date_birth"],
            "local_nascimento" => $data["local"],
            "uf" => $data["uf"],
            "sexo" => $data["gender"],
            "estado_civil" => $data["marital_status"],
            "nome_mae" => $data["name_mother"]
        ];

        $this->create("cadastro_usuarios", $params);

        return Messages::setMessage("success", "Cadastro realizado com sucesso!");
    }

    public function dashboard(array $data): array
    {
        $searchUserByName = $data["search_user"];

        $terms = null;

        if ($searchUserByName) {
            $terms = "nome LIKE '%$searchUserByName%'";
        }

        $stmt = $this->read("cadastro_usuarios", "id_usuario, nome, cpf, data_nascimento, sexo", $terms);

        return $stmt->fetchAll();
    }

    public function userByID(array $data): array
    {
        $id = $data["id"];

        $stmt = $this->read("cadastro_usuarios", "*", "id_usuario = :id_usuario", ["id_usuario" => $id]);

        $row = $stmt->rowCount();

        if ($row == 0) return Messages::setMessage("error", "Usuário não encontrado!");

        return $stmt->fetch();
    }

    public function updateUser(array $params): array
    {
        $id = $params["id"];
        $data = $params["data"];

        $setParams = [
            "nome" => $data["name"],
            "cpf" => $data["cpf"],
            "data_nascimento" => $data["date_birth"],
            "local_nascimento" => $data["local"],
            "uf" => $data["uf"],
            "sexo" => $data["gender"],
            "estado_civil" => $data["marital_status"],
            "nome_mae" => $data["name_mother"]
        ];

        $this->update("cadastro_usuarios", $setParams, "id_usuario = :id_usuario", ["id_usuario" => $id]);

        return Messages::setMessage("success", "Dados atualizados com sucesso!");
    }

    public function destroy(array $data): array
    {
        $id = $data["id"];

        $this->delete("cadastro_usuarios", "id_usuario = :id_usuario", ["id_usuario" => $id]);

        return Messages::setMessage("success", "Dados deletados com sucesso!");
    }
}
