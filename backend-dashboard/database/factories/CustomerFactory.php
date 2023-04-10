<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Provider\it_IT\Company;
use Faker\Provider\it_IT\Address;
use Faker\Provider\it_IT\Person;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class CustomerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        return [
            'partita_iva' => Company::vatId(false),
            'ragione_sociale' => $this->faker->lastName() . ' '  . Company::companySuffix(),
            'indirizzo' => Address::streetSuffix() . " " . Person::firstNameMale() . ", " . Address::buildingNumber(),
            'citta' => Address::state(),
            'cap' => Address::postcode(),
            'provincia' => Address::stateAbbr(),
            'stato' => 'Italia',
            'latitudine' => $this->faker->latitude($min = -90, $max = 90),
            'longitudine' => $this->faker->longitude($min = -180, $max = 180),
            //'logo' => $this->faker->imageUrl($width = 640, $height = 640 , 'cats'), // 'http://lorempixel.com/640/640/'
            'logo' => 'https://picsum.photos/600/600?random=' . random_int(1,100000),
        ];

    }
}
