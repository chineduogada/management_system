export default class UserCard {
	static render(request, element, props) {
		const content =
			request == "POST"
				? `
          <h3>Hi <span class="color-primary">${props["full name"]}</span></h3>
          <h6>Welcome our <span class="color-primary text-t-cap">management system <i class="fa fa-server"></i></span>, we do make that your information is secured and safe, so you can do sure to Explore <i class="fa fa-lightbulb color-primary"></i> more. Thanks for visiting </h6>
          <p>Here your password <i class="fa fa-level-down"></i></p>
          <h4 class="color-primary">${props.password}</h4>
        `
				: `
          <h3>Welcome Back <span class="color-primary">${
						props["full name"]
					}</span>,</h3>
          <h6>
            to our <span class="color-primary text-t-cap">management system <i class="fa fa-server"></i></span>, whereby you have a maximum flexibility to manage a specific flow of resources. 
            <h6>We do make that your information is secured and safe, so you can do sure to Explore <i class="fa fa-lightbulb color-primary"></i> more. 
            <h6>Thanks for re-visiting.</h6>
            </h6>
        `;
		element.innerHTML = `
        <div class="user-card">
          ${content} 
        </div>
      `;
	}
}
