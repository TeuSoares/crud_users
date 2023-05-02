<?php
namespace App\Helpers;

abstract class Controller 
{
    private $model;

    protected function setModel(string $model): void
    {
        $classe = "\\App\\Models\\{$model}";
        $this->model = new $classe;
    }

    protected function getModelMethod(string $method, $data = []): array
    {
        return $this->model->$method($data);
    }
}
