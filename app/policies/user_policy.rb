class UserPolicy < ApplicationPolicy

	def show?
		User
	end

	class Scope < Scope
		def resolve
			# if user.admin?
			# scope.all
			# else
			
			# scope.where(user_id: @user.id)
			# end
		end
	end
end 