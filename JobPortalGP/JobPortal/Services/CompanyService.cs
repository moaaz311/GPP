using JobPortal.Data;

namespace JobPortal.Services
{
    public class CompanyService
    {
        private readonly JobPortalContext _context;
        
        public CompanyService(JobPortalContext context)
        {
            _context = context;
        }
        
        // Add your service methods here
    }
}