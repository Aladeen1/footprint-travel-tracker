class ContestRegistrationsController < ApplicationController
	def create
		if !user_signed_in?
			redirect_to new_user_session_path
		else 
			@contestRegistration = ContestRegistration.new(contest_registration_params)
			@contestRegistration.user_id = current_user.id
			@contestRegistration.save!

			redirect_to ranking_path(@contestRegistration.ranking_id)
		end
	end

	def destroy
		@contestRegistration = ContestRegistration.find(params[:id])
		@contestRegistration.destroy
		redirect_to ranking_path(@contestRegistration.ranking_id)
	end

	private

	def contest_registration_params
  	  params.require(:contest_registration).permit(:ranking_id)
  	end
end
