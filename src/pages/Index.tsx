import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');

  const liveMatches = [
    { id: 1, team1: 'Барселона', team2: 'Реал Мадрид', score: '2:1', time: '67\'', sport: 'Футбол', k1: 2.1, k2: 3.5, isLive: true },
    { id: 2, team1: 'Лейкерс', team2: 'Воины', score: '89:92', time: 'Q3 4:32', sport: 'Баскетбол', k1: 1.8, k2: 2.0, isLive: true },
    { id: 3, team1: 'Ливерпуль', team2: 'Челси', score: '', time: '19:00', sport: 'Футбол', k1: 1.95, k2: 2.2, isLive: false },
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

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto px-4 py-6">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'bets' && renderBets()}
        {activeTab === 'analytics' && renderAnalytics()}
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
              <Icon name="Home" size={24} />
              <span className="text-xs font-medium">Главная</span>
            </button>
            <button
              onClick={() => setActiveTab('bets')}
              className={`flex flex-col items-center gap-1 transition-colors ${
                activeTab === 'bets' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon name="Ticket" size={24} />
              <span className="text-xs font-medium">Ставки</span>
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex flex-col items-center gap-1 transition-colors ${
                activeTab === 'analytics' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon name="Brain" size={24} />
              <span className="text-xs font-medium">Анализ</span>
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`flex flex-col items-center gap-1 transition-colors relative ${
                activeTab === 'notifications' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon name="Bell" size={24} />
              <span className="text-xs font-medium">Оповещения</span>
              <span className="absolute top-0 right-2 w-2 h-2 bg-accent rounded-full animate-pulse" />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Index;