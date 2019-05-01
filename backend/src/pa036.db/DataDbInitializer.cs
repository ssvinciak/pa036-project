using pa036.db.DataDbContext;

public class DataDbInitializer : CreateDatabaseIfNotExists<DataDbContext>{
    protected override void Seed(DataDbContext context){
        var sqlFiles = Directory.GetFiles(AppDomain.CurrentDomain.BaseDirectory, "*.sql").OrderBy(x => X);
        foreach (string file in sqlFiles){
            context.Database.ExecuteSqlCommand(File.ReadAllText(file));
        }
        base.Seed(context);
    }

}