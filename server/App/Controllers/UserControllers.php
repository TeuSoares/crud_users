<?php
namespace App\Controllers;

use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;

use App\Helpers\Controller;

class UserControllers extends Controller
{
    public function __construct() 
    {
        $this->setModel("UserModels");
    }

    public function register(Request $request, Response $response)
    {
        $data = $request->getParsedBody();

        $msg = $this->getModelMethod("register", $data);

        return $response->withJson($msg, 201);
    }

    public function dashboard(Request $request, Response $response)
    {
        $searchUserByName = $request->getQueryParam('search_user');

        $data = $this->getModelMethod("dashboard", ["search_user" => $searchUserByName]);

        return $response->withJson($data);
    }

    public function userByID(Request $request, Response $response)
    {
        $id = $request->getAttribute('id');

        $data = $this->getModelMethod("userByID", ["id" => $id]);

        if (isset($data["status"]) && $data["status"] == "error") {
            return $response->withJson($data, 404);
        }

        return $response->withJson($data);
    }

    public function update(Request $request, Response $response)
    {
        $id = $request->getAttribute('id');
        $data = $request->getParsedBody();

        $msg = $this->getModelMethod("updateUser", ["id" => $id, "data" => $data]);

        return $response->withJson($msg);
    }

    public function delete(Request $request, Response $response)
    {
        $id = $request->getAttribute('id');

        $msg = $this->getModelMethod("destroy", ["id" => $id]);

        return $response->withJson($msg);
    }
}
