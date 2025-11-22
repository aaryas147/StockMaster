import React from 'react';
import { User, Mail, Phone, MapPin, Briefcase, Shield } from 'lucide-react';
import { PageLayout } from '../PageLayout';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select } from '../ui/select';

export function ProfilePage() {
  return (
    <PageLayout
      title="Profile"
      subtitle="Manage your account settings and preferences"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center mb-4">
              <User className="w-12 h-12 text-accent" />
            </div>
            <h3 className="text-foreground mb-1">John Manager</h3>
            <p className="text-sm text-muted-foreground mb-4">Inventory Manager</p>
            <Button variant="outline" size="sm">
              Change Photo
            </Button>
          </div>

          <div className="mt-6 pt-6 border-t border-border space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">john.manager@company.com</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">New York, NY</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Briefcase className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">Operations Department</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Shield className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">Manager Access</span>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h3 className="text-foreground mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-foreground mb-2">First Name</label>
                <Input defaultValue="John" />
              </div>
              <div>
                <label className="block text-sm text-foreground mb-2">Last Name</label>
                <Input defaultValue="Manager" />
              </div>
              <div>
                <label className="block text-sm text-foreground mb-2">Email Address</label>
                <Input type="email" defaultValue="john.manager@company.com" />
              </div>
              <div>
                <label className="block text-sm text-foreground mb-2">Phone Number</label>
                <Input type="tel" defaultValue="+1 (555) 123-4567" />
              </div>
              <div>
                <label className="block text-sm text-foreground mb-2">Job Title</label>
                <Input defaultValue="Inventory Manager" />
              </div>
              <div>
                <label className="block text-sm text-foreground mb-2">Department</label>
                <Select>
                  <option>Operations</option>
                  <option>Warehouse</option>
                  <option>Logistics</option>
                  <option>Administration</option>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-border">
              <Button variant="outline">Cancel</Button>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Save Changes
              </Button>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h3 className="text-foreground mb-4">Security Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-foreground mb-2">Current Password</label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <div>
                <label className="block text-sm text-foreground mb-2">New Password</label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <div>
                <label className="block text-sm text-foreground mb-2">Confirm New Password</label>
                <Input type="password" placeholder="••••••••" />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-border">
              <Button variant="outline">Cancel</Button>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Update Password
              </Button>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h3 className="text-foreground mb-4">Preferences</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-foreground mb-2">Language</label>
                <Select>
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </Select>
              </div>
              <div>
                <label className="block text-sm text-foreground mb-2">Timezone</label>
                <Select>
                  <option>Eastern Time (ET)</option>
                  <option>Central Time (CT)</option>
                  <option>Mountain Time (MT)</option>
                  <option>Pacific Time (PT)</option>
                </Select>
              </div>
              <div>
                <label className="block text-sm text-foreground mb-2">Date Format</label>
                <Select>
                  <option>MM/DD/YYYY</option>
                  <option>DD/MM/YYYY</option>
                  <option>YYYY-MM-DD</option>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-border">
              <Button variant="outline">Cancel</Button>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Save Preferences
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
