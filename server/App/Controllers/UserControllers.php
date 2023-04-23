<?php
namespace App\Controllers;

use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;

use App\Models\UserModels;

class UserControllers 
{
    private UserModels $model;

    public function __construct() {
        $this->model = new UserModels;
    }

    public function register(Request $request, Response $response)
    {
        $data = $request->getParsedBody();

        $model = $this->model;

        $msg = $model->register($data);

        return $response->withJson($msg, 201);
    }

    public function dashboard(Request $request, Response $response)
    {
        $searchUserByName = $request->getQueryParam('search_user');

        $model = $this->model;

        $data = $model->dashboard($searchUserByName);

        return $response->withJson($data);
    }

    public function userByID(Request $request, Response $response)
    {
        $id = $request->getAttribute('id');

        $model = $this->model;

        $data = $model->userByID($id);

        if (isset($data["status"]) && $data["status"] == "error") {
            return $response->withJson($data, 404);
        }

        return $response->withJson($data);
    }

    public function update(Request $request, Response $response)
    {
        $id = $request->getAttribute('id');
        $data = $request->getParsedBody();

        $model = $this->model;

        $msg = $model->update($id, $data);

        return $response->withJson($msg);
    }

    public function delete(Request $request, Response $response)
    {
        $id = $request->getAttribute('id');

        $model = $this->model;

        $msg = $model->delete($id);

        return $response->withJson($msg);
    }
}
