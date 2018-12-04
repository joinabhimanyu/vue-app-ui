using Nancy;
using System;
using DRS_AppUI.Models;
using DRS_AppUI.Services.RedirectLogger;
using DRS_AppUI.Services.Shrinker;

namespace DRS_AppUI.Modules
{
    public class RouterModule : NancyModule
    {
        public RouterModule() : base("/r")
        {
            Get("{su}", async args =>
            {
                var shrunkUrl = await ShrinkerService.RetrieveShrunkUrlAsync((string)args.su);
                if (shrunkUrl == null)
                {
                    return new Response().WithStatusCode(HttpStatusCode.NotFound);
                }
                // Log request, analytics, etc.
                await RedirectLoggerService.LogRedirectAsync(new UrlRedirectEvent
                {
                    ClientAddress = Request.UserHostAddress,
                    EventId = Guid.NewGuid().ToString("N"),
                    Referrer = Request.Headers.Referrer,
                    ShrunkUrl = shrunkUrl,
                    Timestamp = DateTime.Now
                });

                // Redirect user
                return Response.AsRedirect(shrunkUrl.Target);
            });
        }
    }
}