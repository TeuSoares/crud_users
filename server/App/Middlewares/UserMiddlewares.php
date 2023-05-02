<?php
namespace App\Middlewares;

use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;

use App\Helpers\Validation;
use App\Helpers\Model;
use App\Helpers\Messages;

class UserMiddlewares extends Model
{
    public function verifyIfExistsUser(Request $request, Response $response, $next)
    {
        $data = $request->getParsedBody();

        $cpf = $data["cpf"];

        $stmt = $this->read("cadastro_usuarios", "cpf", "cpf = :cpf", ["cpf" => $cpf]);

        $row = $stmt->rowCount();

        if ($row > 0) Validation::setErrors("Esse usuário já existe!");

        $errors = Validation::getErrors();

        return Validation::send($errors, $request, $response, $next);
    }

    public function registerFieldsValidation(Request $request, Response $response, $next)
    {
        $data = $request->getParsedBody();
        
        $name = $data["name"];
        $cpf = $data["cpf"];
        $date_birth = $data["date_birth"];
        $local = $data["local"];
        $uf = $data["uf"];
        $gender = $data["gender"];
        $marital_status = $data["marital_status"];
        $name_mother = $data["name_mother"];

        Validation::checkEmptyFields($data);

        Validation::verifyFieldLength([
            ["$name < 4", "O nome não pode conter menos de 4 caracteres!"],
            ["$name_mother < 4", "O campo nome da mãe não pode conter menos de 4 caracteres!"],
            ["$cpf != 11", "Formato de cpf inválido!"],
        ]);

        Validation::onlyLetters(["nome" => $name, "local" => $local, "estado civil" => $marital_status, "Nome da mãe" => $name_mother]);

        Validation::verifyFieldIsNumeric(["cpf" => $cpf]);

        Validation::checkDateValid($date_birth, "Essa data não é válida!");

        $errors = Validation::getErrors();

        return Validation::send($errors, $request, $response, $next);
    }

    public function fieldValidationOfUserSearch(Request $request, Response $response, $next)
    {
        $searchUserByName = $request->getQueryParam('search_user');

        if ($searchUserByName) {
            Validation::checkEmptyFields(["search" => $searchUserByName]);
            Validation::onlyLetters(["pesquisa" => $searchUserByName]);
            Validation::verifyFieldLength([
                ["$searchUserByName < 4", "O campo de pesquisa não pode conter menos de 4 caracteres!"],
            ]);
        }

        $errors = Validation::getErrors();

        return Validation::send($errors, $request, $response, $next);
    }
}
