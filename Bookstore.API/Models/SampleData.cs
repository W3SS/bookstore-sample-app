using System;
using System.Threading.Tasks;
using Bookstore.API.Data;
using Microsoft.Extensions.DependencyInjection;

namespace Bookstore.API.Models
{
    public class SampleData
    {
        public static async Task InitializeDemoDatabaseAsync(IServiceProvider serviceProvider)
        {
            using (var serviceScope = serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var dataContext = serviceScope.ServiceProvider.GetService<DataContext>();

                if (await dataContext.Database.EnsureCreatedAsync())
                {
                    InsertTestData(serviceProvider);
                }
            }
        }

        private static void InsertTestData(IServiceProvider serviceProvider)
        {
            var service = serviceProvider.GetService<DataContext>();

            service.Books.Add(new Book() { Title = "The Social Contract", Author = "Jean-Jacques Rousseau", Price = 15, Quantity = 2 });
            service.Books.Add(new Book() { Title = "On the Origin of Species", Author = "Charles Darwin", Price = 20, Quantity = 0 });
            service.Books.Add(new Book() { Title = "Critique of Pure Reason", Author = "Immanuel Kant", Price = 15, Quantity = 2 });
            service.Books.Add(new Book() { Title = "Tao Te Ching", Author = "Lao Tzu", Price = 10, Quantity = 2 });
            
            service.SaveChanges();

            var authService = serviceProvider.GetService<IAuthRepository>();

            authService.Register(new User() {Username = "admin"}, "Passw0rd!");
        }
    }
}