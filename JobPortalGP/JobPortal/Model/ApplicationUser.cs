using Microsoft.AspNetCore.Identity;

namespace JobPortal.Model
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        // Add other properties as needed
    }
}