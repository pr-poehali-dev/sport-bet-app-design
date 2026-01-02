import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('ru-RU', options);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  };

  const getTodayDate = () => {
    return formatDate(currentDate);
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date(currentDate);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return formatDate(tomorrow);
  };

  const getMatchTime = (hoursFromNow: number) => {
    const matchDate = new Date(currentDate);
    matchDate.setHours(matchDate.getHours() + hoursFromNow);
    return matchDate.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  };

  const liveMatches = [
    { id: 1, team1: 'Манчестер Сити', team2: 'Ливерпуль', score: '1:1', time: '73\'', sport: 'Футбол', k1: 2.3, k2: 3.1, isLive: true },
    { id: 2, team1: 'Бостон Селтикс', team2: 'Лейкерс', score: '95:98', time: 'Q4 6:12', sport: 'Баскетбол', k1: 1.7, k2: 2.1, isLive: true },
    { id: 3, team1: 'Бавария', team2: 'Боруссия Д', score: '', time: getMatchTime(3), sport: 'Футбол', k1: 1.85, k2: 2.4, isLive: false },
  ];

  const myBets = [
    { id: 1, match: 'Манчестер - Арсенал', bet: 'П1', amount: 1000, coef: 2.1, status: 'active', potential: 2100 },
    { id: 2, match: 'Бавария - ПСЖ', bet: 'ТБ 2.5', amount: 500, coef: 1.8, status: 'won', profit: 400 },
    { id: 3, match: 'Интер - Милан', bet: 'П2', amount: 750, coef: 2.5, status: 'lost', profit: -750 },
  ];

  const statsData = [
    { month: 'Янв', profit: 2400, bets: 12 },
    { month: 'Фев', profit: 1800, bets: 15 },
    { month: 'Мар', profit: 3200, bets: 18 },
    { month: 'Апр', profit: 2800, bets: 20 },
    { month: 'Май', profit: 4100, bets: 22 },
    { month: 'Июн', profit: 3600, bets: 25 },
  ];

  const aiPredictions = [
    { match: 'Бавария - Боруссия', prediction: 'П1', confidence: 87, odds: 1.65 },
    { match: 'ПСЖ - Лион', prediction: 'ТБ 2.5', confidence: 72, odds: 1.90 },
    { match: 'Атлетико - Севилья', prediction: 'Обе забьют', confidence: 68, odds: 1.75 },
  ];

  const notifications = [
    { id: 1, text: 'Ваша ставка на Барселону выиграла! +2100₽', time: '5 мин назад', type: 'win' },
    { id: 2, text: 'Новый AI прогноз: Бавария - Боруссия', time: '15 мин назад', type: 'info' },
    { id: 3, text: 'Коэффициент изменился на матч Ливерпуль - Челси', time: '1 час назад', type: 'alert' },
  ];

  const deepSeekAnalysis = [
    {
      id: 1,
      match: 'Манчестер Сити - Арсенал',
      sport: 'АПЛ',
      time: `Сегодня ${getMatchTime(5)}`,
      date: getTodayDate(),
      recommendation: 'Тотал больше 2.5 голов',
      confidence: 89,
      odds: 1.92,
      expectedProfit: '+19%',
      reasoning: 'Закономерность: В последних 9 из 10 матчей Сити дома было ТБ 2.5. Арсенал пропустил в 7 из 8 выездных игр.',
      analysis: {
        form: { home: 88, away: 81 },
        h2h: 'Последние 6 матчей: среднее 3.8 гола за матч',
        injuries: 'Все атакующие лидеры в строю',
        weather: 'Ясно, +12°C, идеально для атакующего футбола',
        motivation: 'Критично высокая - борьба за чемпионство'
      },
      keyFactors: [
        { icon: 'TrendingUp', text: 'Сити: ТБ 2.5 в 90% домашних матчей (9/10)', positive: true },
        { icon: 'Target', text: 'Средний xG Сити дома: 2.7 за матч', positive: true },
        { icon: 'Shield', text: 'Арсенал пропустил в 87.5% выездных игр (7/8)', positive: true },
        { icon: 'Zap', text: 'История противостояний: 83% матчей ТБ 2.5 (5/6)', positive: true }
      ],
      statistics: {
        pattern: 'ТБ 2.5',
        success_rate: '90%',
        sample_size: '10 матчей',
        correlation: 'Высокая'
      }
    },
    {
      id: 2,
      match: 'Бостон Селтикс - Майами Хит',
      sport: 'NBA',
      time: `${getTomorrowDate().split(' ')[0]} января 02:30`,
      date: getTomorrowDate(),
      recommendation: 'Победа Бостона с форой -5.5',
      confidence: 85,
      odds: 1.88,
      expectedProfit: '+15%',
      reasoning: 'Паттерн: Бостон выигрывает дома с разницей 6+ очков в 82% случаев против команд ниже 6 места.',
      analysis: {
        form: { home: 91, away: 68 },
        h2h: 'Бостон выиграл последние 4 домашних встречи со средней разницей +11',
        injuries: 'У Майами травмированы 2 стартовых защитника',
        weather: 'Закрытая арена TD Garden',
        motivation: 'Высокая - защита домашней площадки'
      },
      keyFactors: [
        { icon: 'TrendingUp', text: 'Бостон дома: 82% побед с форой -5.5 (14/17)', positive: true },
        { icon: 'Users', text: 'Майами без двух защитников (27 очков за игру)', positive: true },
        { icon: 'Flame', text: 'Бостон: лучшая атака лиги дома (119.4 ppg)', positive: true },
        { icon: 'History', text: 'H2H: последние 4 дома - средняя разница +11', positive: true }
      ],
      statistics: {
        pattern: 'Фора -5.5',
        success_rate: '82%',
        sample_size: '17 матчей',
        correlation: 'Очень высокая'
      }
    },
    {
      id: 3,
      match: 'Бавария - Боруссия Дортмунд',
      sport: 'Бундеслига',
      time: `${getTomorrowDate().split(' ')[0]} января 20:30`,
      date: getTomorrowDate(),
      recommendation: 'Обе команды забьют + ТБ 2.5',
      confidence: 87,
      odds: 2.05,
      expectedProfit: '+21%',
      reasoning: 'Статистика: В 94% личных встреч обе забивали. Дортмунд забил во всех 11 выездных матчах сезона.',
      analysis: {
        form: { home: 89, away: 84 },
        h2h: 'В 15 из 16 последних встреч обе забивали',
        injuries: 'Все нападающие доступны обеим командам',
        weather: 'Крытая арена Альянц',
        motivation: 'Максимальная - Der Klassiker, принципиальное дерби'
      },
      keyFactors: [
        { icon: 'Swords', text: 'H2H: обе забивают в 94% встреч (15/16)', positive: true },
        { icon: 'Target', text: 'Дортмунд: забил во всех 11 выездных матчах (100%)', positive: true },
        { icon: 'TrendingUp', text: 'Бавария дома: в среднем 3.1 гола за матч', positive: true },
        { icon: 'Zap', text: 'Атаки обеих команд в топ-3 лиги по xG', positive: true }
      ],
      statistics: {
        pattern: 'Обе забьют + ТБ 2.5',
        success_rate: '94%',
        sample_size: '16 матчей H2H',
        correlation: 'Критически высокая'
      }
    }
  ];

  const renderHome = () => (
    <div className="space-y-6 pb-20">
      <div className="gradient-sport p-6 rounded-2xl text-white">
        <h1 className="text-2xl font-bold mb-2">Добро пожаловать! 🎯</h1>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm opacity-90">Баланс</p>
            <p className="text-3xl font-bold">24 580 ₽</p>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-90">Прибыль за месяц</p>
            <p className="text-2xl font-bold text-green-300">+3 600 ₽</p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Live матчи</h2>
          <Badge variant="destructive" className="animate-pulse-glow">
            <Icon name="Radio" size={12} className="mr-1" />
            LIVE
          </Badge>
        </div>
        <div className="space-y-3">
          {liveMatches.map((match) => (
            <Card key={match.id} className="p-4 bg-card hover:bg-card/80 transition-all hover:scale-[1.02]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">{match.sport}</Badge>
                  {match.isLive && (
                    <Badge variant="destructive" className="text-xs animate-pulse-glow">
                      {match.time}
                    </Badge>
                  )}
                  {!match.isLive && (
                    <Badge variant="outline" className="text-xs">{match.time}</Badge>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-semibold">{match.team1}</p>
                  <p className="font-semibold mt-1">{match.team2}</p>
                </div>
                {match.score && (
                  <div className="text-2xl font-bold text-primary mx-4">{match.score}</div>
                )}
                <div className="flex flex-col gap-2">
                  <Button size="sm" className="bg-primary hover:bg-primary/90 min-w-[60px]">
                    {match.k1}
                  </Button>
                  <Button size="sm" className="bg-secondary hover:bg-secondary/90 min-w-[60px]">
                    {match.k2}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBets = () => (
    <div className="space-y-6 pb-20">
      <div className="gradient-sport p-6 rounded-2xl text-white">
        <h1 className="text-2xl font-bold mb-4">Мои ставки</h1>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm opacity-90">Активных</p>
            <p className="text-2xl font-bold">3</p>
          </div>
          <div>
            <p className="text-sm opacity-90">Выигрыш</p>
            <p className="text-2xl font-bold text-green-300">67%</p>
          </div>
          <div>
            <p className="text-sm opacity-90">ROI</p>
            <p className="text-2xl font-bold text-green-300">+18%</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Активные</TabsTrigger>
          <TabsTrigger value="won">Выигрыши</TabsTrigger>
          <TabsTrigger value="lost">Проигрыши</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-3 mt-4">
          {myBets.filter(b => b.status === 'active').map((bet) => (
            <Card key={bet.id} className="p-4 bg-card">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold">{bet.match}</p>
                <Badge className="bg-primary">Активна</Badge>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                <span>Ставка: {bet.bet}</span>
                <span>Коэф: {bet.coef}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Сумма: {bet.amount}₽</span>
                <span className="font-bold text-green-400">Выплата: {bet.potential}₽</span>
              </div>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="won" className="space-y-3 mt-4">
          {myBets.filter(b => b.status === 'won').map((bet) => (
            <Card key={bet.id} className="p-4 bg-card border-green-500/30">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold">{bet.match}</p>
                <Badge className="bg-green-500">Выигрыш</Badge>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                <span>Ставка: {bet.bet}</span>
                <span>Коэф: {bet.coef}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Сумма: {bet.amount}₽</span>
                <span className="font-bold text-green-400">Прибыль: +{bet.profit}₽</span>
              </div>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="lost" className="space-y-3 mt-4">
          {myBets.filter(b => b.status === 'lost').map((bet) => (
            <Card key={bet.id} className="p-4 bg-card border-red-500/30">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold">{bet.match}</p>
                <Badge className="bg-red-500">Проигрыш</Badge>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                <span>Ставка: {bet.bet}</span>
                <span>Коэф: {bet.coef}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Сумма: {bet.amount}₽</span>
                <span className="font-bold text-red-400">{bet.profit}₽</span>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6 pb-20">
      <div className="gradient-sport p-6 rounded-2xl text-white">
        <div className="flex items-center gap-2 mb-2">
          <Icon name="Brain" size={24} />
          <h1 className="text-2xl font-bold">AI Анализ</h1>
        </div>
        <p className="text-sm opacity-90">Прогнозы на основе нейросети</p>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Рекомендации AI</h2>
        <div className="space-y-3">
          {aiPredictions.map((pred, idx) => (
            <Card key={idx} className="p-4 bg-card hover:bg-card/80 transition-all">
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold">{pred.match}</p>
                <Badge className="bg-secondary">{pred.odds}</Badge>
              </div>
              <div className="mb-3">
                <p className="text-sm text-muted-foreground mb-2">Прогноз: {pred.prediction}</p>
                <div className="flex items-center gap-2">
                  <Progress value={pred.confidence} className="flex-1" />
                  <span className="text-sm font-semibold text-primary">{pred.confidence}%</span>
                </div>
              </div>
              <Button className="w-full gradient-sport">
                <Icon name="TrendingUp" size={16} className="mr-2" />
                Поставить
              </Button>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Статистика прибыли</h2>
        <Card className="p-4 bg-card">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={statsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
                labelStyle={{ color: '#F3F4F6' }}
              />
              <Line type="monotone" dataKey="profit" stroke="#0EA5E9" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Активность ставок</h2>
        <Card className="p-4 bg-card">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={statsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
                labelStyle={{ color: '#F3F4F6' }}
              />
              <Bar dataKey="bets" fill="#8B5CF6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6 pb-20">
      <div className="gradient-sport p-6 rounded-2xl text-white">
        <div className="flex items-center gap-2">
          <Icon name="Bell" size={24} />
          <h1 className="text-2xl font-bold">Уведомления</h1>
        </div>
      </div>

      <div className="space-y-3">
        {notifications.map((notif) => (
          <Card key={notif.id} className="p-4 bg-card hover:bg-card/80 transition-all">
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-full ${
                notif.type === 'win' ? 'bg-green-500/20' : 
                notif.type === 'info' ? 'bg-blue-500/20' : 
                'bg-orange-500/20'
              }`}>
                <Icon 
                  name={notif.type === 'win' ? 'TrophyIcon' : notif.type === 'info' ? 'Brain' : 'AlertCircle'} 
                  size={20}
                  className={
                    notif.type === 'win' ? 'text-green-400' : 
                    notif.type === 'info' ? 'text-blue-400' : 
                    'text-orange-400'
                  }
                />
              </div>
              <div className="flex-1">
                <p className="font-medium">{notif.text}</p>
                <p className="text-sm text-muted-foreground mt-1">{notif.time}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderDeepSeek = () => (
    <div className="space-y-6 pb-20">
      <div className="gradient-sport p-6 rounded-2xl text-white">
        <div className="flex items-center gap-2 mb-2">
          <Icon name="Sparkles" size={28} />
          <h1 className="text-2xl font-bold">Дип Сик AI</h1>
        </div>
        <p className="text-sm opacity-90">Глубокий анализ и готовые решения</p>
      </div>

      <div className="space-y-4">
        {deepSeekAnalysis.map((analysis) => (
          <Card key={analysis.id} className="p-5 bg-card border-2 border-primary/20 hover:border-primary/40 transition-all">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">{analysis.sport}</Badge>
                    <Badge variant="outline" className="text-xs">{analysis.time}</Badge>
                  </div>
                  <h3 className="font-bold text-lg">{analysis.match}</h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{analysis.odds}</div>
                  <div className="text-xs text-muted-foreground">Коэффициент</div>
                </div>
              </div>

              <div className="gradient-sport p-4 rounded-xl">
                <div className="flex items-center justify-between text-white mb-2">
                  <div className="flex items-center gap-2">
                    <Icon name="Lightbulb" size={20} />
                    <span className="font-semibold">Рекомендация:</span>
                  </div>
                  <Badge className="bg-white text-primary font-bold">
                    {analysis.confidence}% уверенность
                  </Badge>
                </div>
                <p className="text-white font-bold text-lg">{analysis.recommendation}</p>
                <p className="text-sm text-white/80 mt-1">Ожидаемая прибыль: {analysis.expectedProfit}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/50 p-3 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Форма дома</div>
                  <div className="flex items-center gap-2">
                    <Progress value={analysis.analysis.form.home} className="flex-1" />
                    <span className="text-sm font-bold">{analysis.analysis.form.home}%</span>
                  </div>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Форма гостей</div>
                  <div className="flex items-center gap-2">
                    <Progress value={analysis.analysis.form.away} className="flex-1" />
                    <span className="text-sm font-bold">{analysis.analysis.form.away}%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-muted-foreground">Ключевые факторы:</h4>
                {analysis.keyFactors.map((factor, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm">
                    <Icon name={factor.icon} size={16} className="text-green-400 mt-0.5" />
                    <span>{factor.text}</span>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="BookOpen" size={16} className="text-primary" />
                  <h4 className="font-semibold text-sm">Закономерность:</h4>
                </div>
                <p className="text-sm leading-relaxed mb-3">{analysis.reasoning}</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-background/50 p-2 rounded">
                    <div className="text-muted-foreground">Паттерн</div>
                    <div className="font-bold text-primary">{analysis.statistics.pattern}</div>
                  </div>
                  <div className="bg-background/50 p-2 rounded">
                    <div className="text-muted-foreground">Успешность</div>
                    <div className="font-bold text-green-400">{analysis.statistics.success_rate}</div>
                  </div>
                  <div className="bg-background/50 p-2 rounded">
                    <div className="text-muted-foreground">Выборка</div>
                    <div className="font-bold">{analysis.statistics.sample_size}</div>
                  </div>
                  <div className="bg-background/50 p-2 rounded">
                    <div className="text-muted-foreground">Корреляция</div>
                    <div className="font-bold">{analysis.statistics.correlation}</div>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 p-3 rounded-lg space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <Icon name="History" size={14} className="text-muted-foreground" />
                  <span className="text-muted-foreground">H2H:</span>
                  <span className="font-medium">{analysis.analysis.h2h}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Activity" size={14} className="text-muted-foreground" />
                  <span className="text-muted-foreground">Травмы:</span>
                  <span className="font-medium">{analysis.analysis.injuries}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Zap" size={14} className="text-muted-foreground" />
                  <span className="text-muted-foreground">Мотивация:</span>
                  <span className="font-medium">{analysis.analysis.motivation}</span>
                </div>
              </div>

              <Button className="w-full gradient-sport text-white font-bold py-6 text-base">
                <Icon name="Sparkles" size={18} className="mr-2" />
                Использовать прогноз
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto px-4 py-6">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'bets' && renderBets()}
        {activeTab === 'analytics' && renderAnalytics()}
        {activeTab === 'deepseek' && renderDeepSeek()}
        {activeTab === 'notifications' && renderNotifications()}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="max-w-md mx-auto px-4">
          <div className="flex items-center justify-around py-3">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center gap-1 transition-colors ${
                activeTab === 'home' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon name="Home" size={22} />
              <span className="text-xs font-medium">Главная</span>
            </button>
            <button
              onClick={() => setActiveTab('bets')}
              className={`flex flex-col items-center gap-1 transition-colors ${
                activeTab === 'bets' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon name="Ticket" size={22} />
              <span className="text-xs font-medium">Ставки</span>
            </button>
            <button
              onClick={() => setActiveTab('deepseek')}
              className={`flex flex-col items-center gap-1 transition-colors relative ${
                activeTab === 'deepseek' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon name="Sparkles" size={22} />
              <span className="text-xs font-medium">Дип Сик</span>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-sport rounded-full animate-pulse" />
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex flex-col items-center gap-1 transition-colors ${
                activeTab === 'analytics' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon name="Brain" size={22} />
              <span className="text-xs font-medium">Анализ</span>
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`flex flex-col items-center gap-1 transition-colors relative ${
                activeTab === 'notifications' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon name="Bell" size={22} />
              <span className="text-xs font-medium">Инфо</span>
              <span className="absolute top-0 right-2 w-2 h-2 bg-accent rounded-full animate-pulse" />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Index;