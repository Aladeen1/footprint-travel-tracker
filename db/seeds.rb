# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'json'

puts 'seeding ..'

filepath = File.join(Rails.root, 'app', 'assets', 'airports.json')
json = File.read(filepath)
airports = JSON.parse(json)

puts 'Going to seed all the names of airports'


airports.each do |airport|
	Airport.create!(name: airport["name"], city: airport["city"], country: airport["country"], iata_code: airport["iata_code"], latitude: airport["_geoloc"]["lat"], longitude: airport["_geoloc"]["lng"])
end

puts 'finished'
