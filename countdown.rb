require 'sinatra'
require 'haml'
require 'date'

get '/' do
    locations = {
        'York Hall'   => [51.530135, -0.054117],
        'Town Hall'   => [51.536636, -0.020864],
        'Great Hall'  => [51.524586, -0.040669],
        'Sports Hall' => [51.524586, -0.040669],
        'Banc-113'    => [52.524586, -0.040669]
    }

    exams = {
                'ecs401u' => ["Procedural Programming", "08-05-2013", "10:00","Banc-113"],
                'ecs404u' => ["Computer Systems and Networks", "01-05-2013", "10:00", "Great Hall"],
                'ecs407u' => ["Logic and Discrete Structures", "22-05-2013", "10:00","Town Hall"],
                'ecs414u' => ["Object-Oriented Programming", "20-05-2013", "10:00", "TBA"],
                'ecs417u' => ["Fundamentals of Web Technology", "17-05-2013", "10:00", "Banc-113"],
                'ecs419u' => ["Information Systems Analysis", "13-05-2013", "10:00", "Sports Hall"],
                'ecs420u' => ["Language and Communication", "21-05-2013", "14:30", "York Hall"]
             }

    @to_display = []

    exams.each do |module_code, array|
        subject     = array[0]
        days_left   = difference(array[1])
        start_time  = array[2]
        venue       = array[3]
        #coordinates = locations[venue]
        @to_display << [subject, days_left, start_time, venue]
    end
    # Sort by days left (fewer first)
    @to_display = @to_display.sort { |a, b| a[1] <=> b[1] }
    haml :index
end

get '/:module' do
    exams = {
                'ecs401u' => "08-05-2013",
                'ecs404u' => "01-05-2013",
                'ecs407u' => "22-05-2013",
                'ecs414u' => "20-05-2013",
                'ecs417u' => "17-05-2013",
                'ecs419u' => "13-05-2013",
                'ecs420u' => "21-05-2013"
            }

    module_code = params[:module]
    @time_left  = difference(exams[module_code])
    haml :debug
end

def difference(exam_date)
    exam = Date.parse(exam_date)
    time = Date.today
    return (exam - time).to_i
end

run Sinatra::Application.run!
