'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Settings, User, Mail, MessageCircle, Send, Copy, Check, Save, Key, Plus, Trash2, Edit2, HelpCircle, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import CodeBlock from '@/components/CodeBlock';
import { notifications } from '@/lib/notifications';

interface UserSSHKey {
  id: string;
  name: string;
  publicKey: string;
  createdAt: string;
}

interface UserData {
  walletAddress: string;
  accountId: string;
  fundWalletAddress: string;
  accountBalance: number;
  contactEmail?: string;
  contactDiscord?: string;
  contactTelegram?: string;
  sshKeys?: UserSSHKey[];
}

export default function SettingsPage() {
  const { connected, publicKey } = useWallet();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    contactEmail: '',
    contactDiscord: '',
    contactTelegram: '',
  });
  const [sshKeys, setSshKeys] = useState<UserSSHKey[]>([]);
  const [showAddKey, setShowAddKey] = useState(false);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [newKeyData, setNewKeyData] = useState({ name: '', publicKey: '' });

  useEffect(() => {
    if (connected && publicKey) {
      loadUserData();
    }
  }, [connected, publicKey]);

  const loadUserData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/account/settings?walletAddress=${publicKey?.toString()}`);
      const data = await response.json();

      if (data.success && data.user) {
        setUser(data.user);
        setFormData({
          contactEmail: data.user.contactEmail || '',
          contactDiscord: data.user.contactDiscord || '',
          contactTelegram: data.user.contactTelegram || '',
        });
      } else {
        notifications.error(data.error || 'Failed to load user data');
      }

      // Load SSH keys
      if (publicKey) {
        loadSSHKeys();
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      notifications.error('Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!connected || !publicKey) return;

    try {
      setSaving(true);
      const response = await fetch('/api/account/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress: publicKey.toString(),
          ...formData,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setUser(data.user);
        notifications.success('Settings saved successfully');
      } else {
        notifications.error(data.error || 'Failed to save settings');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      notifications.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    notifications.success('Copied to clipboard', { duration: 2000 });
    setTimeout(() => setCopied(null), 2000);
  };

  const loadSSHKeys = async () => {
    if (!publicKey) return;
    
    try {
      const response = await fetch(`/api/user/ssh-keys?walletAddress=${publicKey.toString()}`);
      const data = await response.json();
      
      if (data.success) {
        setSshKeys(data.sshKeys || []);
      }
    } catch (error) {
      console.error('Error loading SSH keys:', error);
    }
  };

  const handleAddSSHKey = async () => {
    if (!publicKey || !newKeyData.name || !newKeyData.publicKey) {
      notifications.error('Name and public key are required');
      return;
    }

    try {
      const response = await fetch('/api/user/ssh-keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          walletAddress: publicKey.toString(),
          name: newKeyData.name,
          publicKey: newKeyData.publicKey.trim(),
        }),
      });

      const data = await response.json();
      if (data.success) {
        notifications.success('SSH key added successfully');
        setNewKeyData({ name: '', publicKey: '' });
        setShowAddKey(false);
        loadSSHKeys();
      } else {
        notifications.error(data.error || 'Failed to add SSH key');
      }
    } catch (error) {
      console.error('Error adding SSH key:', error);
      notifications.error('Failed to add SSH key');
    }
  };

  const handleDeleteSSHKey = async (keyId: string) => {
    if (!publicKey) return;
    if (!confirm('Are you sure you want to delete this SSH key?')) return;

    try {
      const response = await fetch(`/api/user/ssh-keys?walletAddress=${publicKey.toString()}&keyId=${keyId}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (data.success) {
        notifications.success('SSH key deleted successfully');
        loadSSHKeys();
      } else {
        notifications.error(data.error || 'Failed to delete SSH key');
      }
    } catch (error) {
      console.error('Error deleting SSH key:', error);
      notifications.error('Failed to delete SSH key');
    }
  };

  if (!connected) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
          <h2 className="text-lg font-medium text-yellow-800 dark:text-yellow-200 mb-2">
            Wallet Not Connected
          </h2>
          <p className="text-yellow-700 dark:text-yellow-300">
            Please connect your Solana wallet to view account settings.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Account Settings</h1>
        <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
          Manage your account information and contact preferences
        </p>
      </div>

      <div className="space-y-6">
        {/* Account Information */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="flex items-center mb-6">
            <User className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Account Information</h2>
          </div>

          <dl className="space-y-4">
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Wallet Address</dt>
              <dd className="mt-1 flex items-center space-x-2">
                <p className="text-sm font-mono text-gray-900 dark:text-white break-all">
                  {user?.walletAddress || publicKey?.toString()}
                </p>
                <button
                  onClick={() => copyToClipboard(user?.walletAddress || publicKey?.toString() || '', 'wallet')}
                  className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded transition-colors"
                  title="Copy wallet address"
                >
                  {copied === 'wallet' ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Account ID</dt>
              <dd className="mt-1 flex items-center space-x-2">
                <p className="text-sm font-mono text-gray-900 dark:text-white">
                  {user?.accountId || 'Loading...'}
                </p>
                <button
                  onClick={() => copyToClipboard(user?.accountId || '', 'accountId')}
                  className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded transition-colors"
                  title="Copy account ID"
                >
                  {copied === 'accountId' ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </dd>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Use this Account ID when setting up GPU workers
              </p>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Fund Wallet Address</dt>
              <dd className="mt-1 flex items-center space-x-2">
                <p className="text-sm font-mono text-gray-900 dark:text-white break-all">
                  {user?.fundWalletAddress || 'Loading...'}
                </p>
                <button
                  onClick={() => copyToClipboard(user?.fundWalletAddress || '', 'fundWallet')}
                  className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded transition-colors"
                  title="Copy fund wallet address"
                >
                  {copied === 'fundWallet' ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </dd>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Platform-managed wallet for account balance
              </p>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Account Balance</dt>
              <dd className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                {user?.accountBalance?.toFixed(4) || '0.0000'} USDT
              </dd>
            </div>
          </dl>
        </div>

        {/* Contact Information */}
        <div className="hidden bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="flex items-center mb-6">
            <Mail className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Contact Information</h2>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Optional contact information for account-related notifications and updates
          </p>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <input
                type="email"
                id="contactEmail"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="contactDiscord" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Discord Username
              </label>
              <input
                type="text"
                id="contactDiscord"
                value={formData.contactDiscord}
                onChange={(e) => setFormData({ ...formData, contactDiscord: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="username#1234"
              />
            </div>

            <div>
              <label htmlFor="contactTelegram" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Telegram Username
              </label>
              <input
                type="text"
                id="contactTelegram"
                value={formData.contactTelegram}
                onChange={(e) => setFormData({ ...formData, contactTelegram: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="@username"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 flex items-center disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* SSH Keys Management */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Key className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">SSH Keys</h2>
            </div>
            <button
              onClick={() => {
                setShowAddKey(true);
                setEditingKey(null);
                setNewKeyData({ name: '', publicKey: '' });
              }}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add SSH Key
            </button>
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Manage your SSH public keys. You need at least one SSH key to rent machines. Select which keys to use when renting.
            </p>
            
            {/* Guide Section */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-start">
                <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-2">
                    How to Add Your SSH Key
                  </h3>
                  <div className="text-sm text-blue-800 dark:text-blue-300 space-y-3">
                    <div>
                      <p className="font-medium mb-1">Step 1: Generate SSH Key (if you don't have one)</p>
                      <p className="text-xs mb-2">Open your terminal and run:</p>
                      <CodeBlock code={'ssh-keygen -t ed25519 -C "your_email@example.com"'} />
                      <p className="text-xs mt-1">Or for RSA: <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">ssh-keygen -t rsa -b 4096 -C "your_email@example.com"</code></p>
                    </div>
                    <div>
                      <p className="font-medium mb-1">Step 2: Get Your Public Key</p>
                      <p className="text-xs mb-2">Copy your public key:</p>
                      <CodeBlock code="cat ~/.ssh/id_ed25519.pub" />
                      <p className="text-xs mt-1">Or if you used RSA: <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">cat ~/.ssh/id_rsa.pub</code></p>
                    </div>
                    <div>
                      <p className="font-medium mb-1">Step 3: Add Key Here</p>
                      <p className="text-xs">Click "Add SSH Key" above, give it a name (e.g., "My Laptop"), and paste the public key you copied.</p>
                    </div>
                    <div className="mt-3 pt-3 border-t border-blue-200 dark:border-blue-700">
                      <Link 
                        href="/docs/renting-gpus" 
                        className="text-xs text-blue-700 dark:text-blue-300 hover:underline flex items-center"
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        View complete renting guide
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {sshKeys.length === 0 && !showAddKey && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>No SSH keys found.</strong> You must add at least one SSH key to rent machines.
              </p>
            </div>
          )}

          {showAddKey && (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                {editingKey ? 'Edit SSH Key' : 'Add New SSH Key'}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Key Name
                  </label>
                  <input
                    type="text"
                    value={newKeyData.name}
                    onChange={(e) => setNewKeyData({ ...newKeyData, name: e.target.value })}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                    placeholder="e.g., My Laptop, Work Computer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Public Key
                  </label>
                  <textarea
                    value={newKeyData.publicKey}
                    onChange={(e) => setNewKeyData({ ...newKeyData, publicKey: e.target.value })}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white font-mono text-sm"
                    rows={3}
                    placeholder="ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQ..."
                  />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Paste your SSH public key here (usually from ~/.ssh/id_rsa.pub or ~/.ssh/id_ed25519.pub)
                  </p>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => {
                      setShowAddKey(false);
                      setEditingKey(null);
                      setNewKeyData({ name: '', publicKey: '' });
                    }}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddSSHKey}
                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                  >
                    {editingKey ? 'Update' : 'Add'} Key
                  </button>
                </div>
              </div>
            </div>
          )}

          {sshKeys.length > 0 && (
            <div className="space-y-3">
              {sshKeys.map((key) => (
                <div
                  key={key.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-medium text-gray-900 dark:text-white">{key.name}</h3>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Added {new Date(key.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm font-mono text-gray-600 dark:text-gray-400 break-all">
                        {key.publicKey}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => copyToClipboard(key.publicKey, `key-${key.id}`)}
                        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded transition-colors"
                        title="Copy public key"
                      >
                        {copied === `key-${key.id}` ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDeleteSSHKey(key.id)}
                        className="p-2 text-red-400 hover:text-red-600 rounded transition-colors"
                        title="Delete key"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

