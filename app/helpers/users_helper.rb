module UsersHelper

  ATTRIBUTES = {
    first_name: "First Name",
    email: "Email",
    password: "Password",
    password_confirmation: "Password Confirmation"
  }

  def error_check(attribute)
    if @user.errors[attribute].any?
      flash.now[(attribute.to_s + "_error").to_sym] =
      "#{ATTRIBUTES[attribute]} #{@user.errors.messages[attribute][0]}."
    end
  end
end
