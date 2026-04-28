<?php

header('Content-Type: application/json; charset=utf-8');
$shouldUpdate = !file_exists("../data/ow.json") || time() - json_decode(file_get_contents("../data/ow.json"), true)["last_update"] > 60 * 60;

if ($shouldUpdate) {
    $json = json_decode(file_get_contents("../data/data.json"), true);
    $data = [];
    foreach ($json as $elem) {
        array_push($data, json_decode(file_get_contents("https://overfast-api.tekrop.fr/players/{$elem["battle_username"]}-{$elem["battle_tag"]}/summary"), true));
    }

    $updatedData = json_encode([ "last_update" => time(), "data" => $data ]);
    file_put_contents("../data/ow.json", $updatedData);
    echo($updatedData);
}
else
{
    echo(file_get_contents("../data/ow.json"));
}