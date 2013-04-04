require 'sinatra'
require 'haml'
require 'time'

get '/' do
    @exams = {
                'ecs401u' => ["Procedural Programming", "08-05-2013"],
                'ecs404u' => ["Computer Systems and Networks", "01-05-2013"],
                'ecs407u' => ["Logic and Discrete Structures", "22-05-2013"],
                'ecs414u' => ["Object-Oriented Programming", "20-05-2013"],
                'ecs417u' => ["Fundamentals of Web Technology", "17-05-2013"],
                'ecs419u' => ["Information Systems Analysis", "13-05-2013"],
                'ecs420u' => ["Language and Communication", "21-05-2013"]
             }

    @times = []
    @exams.each do |module_code, array|
        time_left = difference(array[1])
        @times << [array[0], time_left]
    end
    @times = @times.sort { |a, b| a[1] <=> b[1] }
    erb :index
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
