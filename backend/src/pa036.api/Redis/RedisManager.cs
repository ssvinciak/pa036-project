using StackExchange.Redis;

namespace pa036.api.Redis
{
    public class RedisManager
    {
        private static ConnectionMultiplexer _instance;
        private static readonly object _lockObject = new object();

        public static ConnectionMultiplexer Instance
        {
            get
            {
                if (_instance == null)
                {
                    lock (_lockObject)
                    {
                        if (_instance == null || !_instance.IsConnected)
                        {
                            _instance = ConnectionMultiplexer.Connect("localhost");
                        }
                    }
                }

                return _instance;
            }
        }

        public static IDatabase GetDatabase()
        {
            return _instance?.GetDatabase();
        }
    }
}
