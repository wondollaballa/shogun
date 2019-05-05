<?php

namespace App;
use App\Rule;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Company extends Model
{
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'nick_name',
        'email',
        'street',
        'suite',
        'city',
        'state',
        'country',
        'zipcode',
        'phone',
        'phone_option',
        'hours',
        'blackout_dates',
        'max_occupancy'
    ];

    public function reservations()
    {
        return $this->hasMany(Reservation::class, 'company_id', 'id');
    }

    public function seats()
    {
        return $this->hasMany(Seat::class, 'company_id', 'id');
    }

    public function support()
    {
        return $this->hasMany(Support::class, 'company_id', 'id');
    }

    public function rules()
    {
        return $this->hasMany(Rule::class, 'company_id', 'id');
    }

    public function aboutUs()
    {
        $text = 'Shogun Japanese Steak House has been a success since it was opened in Tyler, TX in 1992 by Tae Park , Shogun’s Owner and CEO. Since then, Shogun of Japan has continued to satisfy dedicated customers for over 25 years. The restaurant is located on South Broadway and a few of the original employees are still with the company today.
        At Shogun of Japan you’ll always find two separate Japanese dining experiences – a sushi bar, and Teppanyaki tables. Shogun specializes mainly in Teppanyaki cooking where the food is prepared and cooked on a Hibachi table in front of customers. Sushi bars and regular dining tables are available where Sushi or Habachi meals can also be served.
        The restaurant’s main objective is to create a Japanese atmosphere to give our customers a feeling of having traveled to Japan for a delicious and authentic Japanese meal. Shogun of Japan not only gives you good food, but a happy dining experience and a great place to celebrate.';
        return $text;
    }

    public function getCompanyWithFormat()
    {
        return $this->formatCompany($this->find(1));

    }
    public function contactUs()
    {
        $rule = Rule::find(1);

        $content = [
            'phone' => $this->formatPhone($this->phone),
            'street' => $this->street,
            'city' => $this->city,
            'state' => $this->state,
            'country' => $this->country,
            'zipcode' => $this->zipcode,
            'store_hours' => json_decode($rule->store_hours),
            'email' => $this->email
        ];
        return json_encode($content);
    }
    public function theExperience()
    {
        $content = [
            'Overview' => "Are you looking for a dining experience with traditional Japanese atmosphere, warm ambiance and a little entertainment while you dine? You've come to the right place! Come to Shogun of Japan for a memorable dining experience featuring Teppanyaki (Hibachi), traditional, and sushi options. Here, dishes are prepared right in front of you at your table, and our talented Hibachi chefs amuse you with their amazing knife techniques, demonstrating the work at the heart of Japanese cuisine. We look forward to serving you as you experience the spectacular Japanese cuisine that Shogun of Japan has to offer!",
            'Teppanyaki' => "Shogun Japanese Steakhouse specializes in Teppanyaki or Hibachi cooking. Guests will delight as a personal chef prepares succulent steak, chicken, and seafood dishes according to the Hibachi style of food preparation.
            While the preparation method is traditional, each chef brings his own sense of humor and spontaneity to the table. All entrees are prepared at your table by Teppan Chefs in a display of flashing knives and exotic aromas. Every meal is a culinary and performance delight that you are sure to enjoy. Known for our spectacular cuisine and entertainment, Shogun is fun for all ages. Whether you bring your family, friends, or a date, let us bring you a little closer to an experience that draws everyone together. Come join us for your birthday, anniversary, or special occasion. It's your chance to enjoy Japanese food in a unique dining experience for your special day!
            All Teppanyaki entrees include our Japanese clear onion soup, crisp green salad with ginger dressing, fresh vegetables, fried rice, or steamed rice",
            'Sushi' => "Watch as our talented sushi chefs transform top-quality ingredients into sushi favorites. Popular items include the California Happy Roll, Tempura Shrimp, Cucumber, Spicy Tuna, Tuna Tower, Spicy Mayo, Eel Sauce, Masago, Uni, the Lobster Crunch Roll, Steamed Shrimp Gyoza, Volcano Salads, and Kobe Beef served with Hot stone . Ginger and fiery wasabi accompany all sushi selections."
        ];
        return json_encode($content);
    }

    private function formatCompany($data) {
        if(isset($data->phone)) {
            $data->formatPhone = $this->formatPhone($data->phone);
        }

        return $data;
    }
    private function formatPhone($phone_number) {
        if (!isset($phone_number)) return;

        switch (strlen($phone_number)) {
            case 10:
            $split1 = substr($phone_number,0,3);
            $split2 = substr($phone_number,3,3);
            $split3 = substr($phone_number,6,4);
            return "($split1) $split2-$split3";
            break;

            case 7:
            $split1 = substr($phone_number,0,3);
            $split2 = substr($phone_number,3,4);
            return "$split1-$split2";
            break;

            default:
            return $phone_number;
            break;

        }
	}
}
