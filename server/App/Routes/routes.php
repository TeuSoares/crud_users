<?php
use App\Controllers\UserControllers;
use App\Middlewares\UserMiddlewares;

$app->group('/api', function () {
    
    $this->post("/register", UserControllers::class . ":register")
    ->add(UserMiddlewares::class . ":verifyIfExistsUser")
    ->add(UserMiddlewares::class . ":registerFieldsValidation");

    $this->get("/dashboard", UserControllers::class . ":dashboard")
    ->add(UserMiddlewares::class . ":fieldValidationOfUserSearch");

    $this->get("/user/{id}", UserControllers::class . ":userByID");

    $this->put("/update/{id}", UserControllers::class . ":update")
    ->add(UserMiddlewares::class . ":registerFieldsValidation");
    
    $this->delete("/delete/{id}", UserControllers::class . ":delete");

});
