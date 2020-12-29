class RankingsController < ApplicationController

	def new
		@ranking = Ranking.new
	end

	def create
		@ranking = Ranking.new(ranking_params)
		@ranking.save!

		@contestRegistration = ContestRegistration.new
		@contestRegistration.user_id = current_user.id
		@contestRegistration.ranking_id = @ranking.id
		@contestRegistration.save!

		redirect_to ranking_path(@ranking)
	end

	def show
		@user = current_user
		@contestRegistration = ContestRegistration.new
		@ranking = Ranking.find(params[:id])
		@user_status = 0
		#initialize user status as 0 (not part of ranking)
		if user_signed_in? && !current_user.contest_registrations.where({ ranking_id: @ranking.id }).empty?
		#If user has registered to a ranking and is part of the current ranking
			@contestRegistration = ContestRegistration.find_by ranking_id: @ranking.id, user_id: current_user.id
			@user_status = 1
		end
		@user_list = @ranking.users.sort_by {|user| user.total_distance}.reverse
		@airports = User.select(:flight_id, :longitude, :latitude).joins(flights: :airports).group(:flight_id, :longitude, :latitude)
		# rank in descending order the different users in the ranking by their total_distance
	end

	private

  	def ranking_params
  	  params.require(:ranking).permit(:name)
  	end
end
