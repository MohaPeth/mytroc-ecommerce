
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Shield, Search, Filter, Download, Eye, FileText, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const SuperAdminAuditLogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');

  // Mock data pour les logs d'audit
  const auditLogs = [
    {
      id: '1',
      user_id: 'user-admin-1',
      user_name: 'Admin Système',
      action: 'CREATE',
      table_name: 'products',
      record_id: 'prod-123',
      old_data: null,
      new_data: { name: 'iPhone 14', price: 999, status: 'published' },
      ip_address: '192.168.1.100',
      user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      severity: 'info',
      created_at: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      user_id: 'user-admin-2',
      user_name: 'Admin Modération',
      action: 'UPDATE',
      table_name: 'users',
      record_id: 'user-456',
      old_data: { status: 'active', role: 'customer' },
      new_data: { status: 'suspended', role: 'customer' },
      ip_address: '192.168.1.101',
      user_agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X)',
      severity: 'warning',
      created_at: '2024-01-15T10:25:00Z'
    },
    {
      id: '3',
      user_id: 'user-admin-1',
      user_name: 'Admin Système',
      action: 'DELETE',
      table_name: 'products',
      record_id: 'prod-789',
      old_data: { name: 'Produit supprimé', price: 199, status: 'published' },
      new_data: null,
      ip_address: '192.168.1.100',
      user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      severity: 'critical',
      created_at: '2024-01-15T10:20:00Z'
    },
    {
      id: '4',
      user_id: 'system',
      user_name: 'Système Automatique',
      action: 'LOGIN_FAILED',
      table_name: 'auth_logs',
      record_id: 'login-attempt-001',
      old_data: null,
      new_data: { attempts: 5, user_id: 'user-suspicious', blocked: true },
      ip_address: '203.0.113.45',
      user_agent: 'Unknown Bot/1.0',
      severity: 'critical',
      created_at: '2024-01-15T10:15:00Z'
    }
  ];

  const filteredLogs = auditLogs.filter(log => 
    (log.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
     log.table_name.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (actionFilter === 'all' || log.action === actionFilter) &&
    (severityFilter === 'all' || log.severity === severityFilter)
  );

  const getActionColor = (action: string) => {
    switch (action) {
      case 'CREATE': return 'bg-green-100 text-green-800';
      case 'UPDATE': return 'bg-blue-100 text-blue-800';
      case 'DELETE': return 'bg-red-100 text-red-800';
      case 'LOGIN': return 'bg-purple-100 text-purple-800';
      case 'LOGIN_FAILED': return 'bg-red-100 text-red-800';
      case 'LOGOUT': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'info': return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'critical': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'info': return 'bg-blue-100 text-blue-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="h-6 w-6 text-red-500" />
            Logs d'Audit
          </h2>
          <p className="text-muted-foreground">
            Surveillez toutes les actions critiques et modifications du système
          </p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Exporter les logs
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Actions Aujourd'hui</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-green-600">+8% vs hier</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Alertes Critiques</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">12</div>
            <p className="text-xs text-red-600">+3 vs hier</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tentatives Suspectes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">8</div>
            <p className="text-xs text-yellow-600">-2 vs hier</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Admins Actifs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Sur 8 total</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Journal d'Audit</CardTitle>
          <CardDescription>
            Historique complet de toutes les actions administratives
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher par utilisateur, action ou table..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les actions</SelectItem>
                <SelectItem value="CREATE">Créations</SelectItem>
                <SelectItem value="UPDATE">Modifications</SelectItem>
                <SelectItem value="DELETE">Suppressions</SelectItem>
                <SelectItem value="LOGIN">Connexions</SelectItem>
                <SelectItem value="LOGIN_FAILED">Tentatives échouées</SelectItem>
              </SelectContent>
            </Select>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sévérité" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les sévérités</SelectItem>
                <SelectItem value="info">Information</SelectItem>
                <SelectItem value="warning">Avertissement</SelectItem>
                <SelectItem value="critical">Critique</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Utilisateur</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Table</TableHead>
                <TableHead>Sévérité</TableHead>
                <TableHead>IP</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <div className="font-medium">{log.user_name}</div>
                    <div className="text-sm text-muted-foreground">{log.user_id}</div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getActionColor(log.action)}>
                      {log.action}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{log.table_name}</div>
                    <div className="text-sm text-muted-foreground">ID: {log.record_id}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getSeverityIcon(log.severity)}
                      <Badge className={getSeverityColor(log.severity)}>
                        {log.severity}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-muted-foreground">{log.ip_address}</div>
                  </TableCell>
                  <TableCell>
                    {new Date(log.created_at).toLocaleString('fr-FR')}
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Détails
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Détails du Log d'Audit</DialogTitle>
                          <DialogDescription>
                            Informations complètes sur cette action
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium">Utilisateur</label>
                              <p className="text-sm text-muted-foreground">{log.user_name} ({log.user_id})</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Action</label>
                              <p className="text-sm text-muted-foreground">{log.action}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Table</label>
                              <p className="text-sm text-muted-foreground">{log.table_name}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium">IP Address</label>
                              <p className="text-sm text-muted-foreground">{log.ip_address}</p>
                            </div>
                          </div>
                          
                          {log.old_data && (
                            <div>
                              <label className="text-sm font-medium">Anciennes données</label>
                              <pre className="mt-1 p-2 bg-gray-100 rounded text-xs overflow-auto">
                                {JSON.stringify(log.old_data, null, 2)}
                              </pre>
                            </div>
                          )}
                          
                          {log.new_data && (
                            <div>
                              <label className="text-sm font-medium">Nouvelles données</label>
                              <pre className="mt-1 p-2 bg-gray-100 rounded text-xs overflow-auto">
                                {JSON.stringify(log.new_data, null, 2)}
                              </pre>
                            </div>
                          )}
                          
                          <div>
                            <label className="text-sm font-medium">User Agent</label>
                            <p className="text-sm text-muted-foreground break-all">{log.user_agent}</p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperAdminAuditLogs;
