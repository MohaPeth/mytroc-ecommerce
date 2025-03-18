
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { BellOff, BellPlus, User, MessageSquare, Settings, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/footer';
import AssistanceButton from '@/components/AssistanceButton';

const Profile = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-24 md:py-20 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Mon compte</h1>
          
          <Tabs defaultValue="profile" className="mb-8">
            <TabsList className="mb-4 bg-gray-100 p-1">
              <TabsTrigger value="profile" className="flex items-center space-x-1">
                <User className="h-4 w-4 mr-1" />
                <span>Profil</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center space-x-1">
                <BellPlus className="h-4 w-4 mr-1" />
                <span>Préférences de notifications</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center space-x-1">
                <Shield className="h-4 w-4 mr-1" />
                <span>Sécurité</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center space-x-1">
                <Settings className="h-4 w-4 mr-1" />
                <span>Paramètres</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Informations personnelles</CardTitle>
                  <CardDescription>Consultez et modifiez vos informations personnelles</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Cette page sera bientôt disponible. Vous pourrez y gérer vos informations personnelles.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Préférences de notifications</CardTitle>
                  <CardDescription>Personnalisez les notifications que vous souhaitez recevoir</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">Types de notifications</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center">
                          <BellPlus className="h-5 w-5 text-mytroc-primary mr-2" />
                          <div>
                            <h4 className="font-medium">Notifications de commandes</h4>
                            <p className="text-sm text-gray-500">Recevez des mises à jour sur vos commandes</p>
                          </div>
                        </div>
                        <button className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">Activé</button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center">
                          <MessageSquare className="h-5 w-5 text-pink-500 mr-2" />
                          <div>
                            <h4 className="font-medium">Promotions et offres spéciales</h4>
                            <p className="text-sm text-gray-500">Recevez des offres exclusives et des promotions</p>
                          </div>
                        </div>
                        <button className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">Activé</button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center">
                          <Settings className="h-5 w-5 text-gray-600 mr-2" />
                          <div>
                            <h4 className="font-medium">Notifications système</h4>
                            <p className="text-sm text-gray-500">Mises à jour importantes concernant votre compte</p>
                          </div>
                        </div>
                        <button className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">Activé</button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">Canaux de notification</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                          <h4 className="font-medium">Notifications par e-mail</h4>
                          <p className="text-sm text-gray-500">Recevez des notifications par e-mail</p>
                        </div>
                        <button className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">Activé</button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                          <h4 className="font-medium">Notifications SMS</h4>
                          <p className="text-sm text-gray-500">Recevez des notifications par SMS</p>
                        </div>
                        <button className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">Désactivé</button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                          <h4 className="font-medium">Notifications push</h4>
                          <p className="text-sm text-gray-500">Recevez des notifications push sur votre appareil</p>
                        </div>
                        <button className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">Désactivé</button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Sécurité du compte</CardTitle>
                  <CardDescription>Gérez les paramètres de sécurité de votre compte</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Cette page sera bientôt disponible. Vous pourrez y gérer les paramètres de sécurité de votre compte.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Paramètres généraux</CardTitle>
                  <CardDescription>Gérez vos préférences générales</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Cette page sera bientôt disponible. Vous pourrez y gérer vos préférences générales.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
      <AssistanceButton />
    </div>
  );
};

export default Profile;
