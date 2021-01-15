class ContestRegistrationsController < ApplicationController
	def create

		@ranking = Ranking.find(params[:contest_registration][:ranking_id].to_i)
		@contestRegistration = ContestRegistration.new(contest_registration_params)

		if !user_signed_in?
			redirect_to new_user_session_path
		else 
			
			if params[:verification].to_i == @ranking.verification
				
				@contestRegistration.user_id = current_user.id
				@contestRegistration.save!

				redirect_to ranking_path(@contestRegistration.ranking_id)

			else 
				flash[:alert] = "Contest idenfication code provided is not correct."
				redirect_to ranking_path(@contestRegistration.ranking_id)
			end
		end
	end

	def destroy
		@contestRegistration = ContestRegistration.find(params[:id])
		@contestRegistration.destroy
		redirect_to ranking_path(@contestRegistration.ranking_id)
	end

	private

	def contest_registration_params
  	  params.require(:contest_registration).permit(:ranking_id, :verification)
  	end
end
