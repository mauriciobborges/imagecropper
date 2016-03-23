require 'sinatra'

set :port, 8080

get '/' do
  File.read('index.html')
end