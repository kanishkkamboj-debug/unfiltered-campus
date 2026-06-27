import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import type { User } from '../../types/user.types';

interface ProfileEditFormProps {
  user: User;
  onCancel: () => void;
  onSave: (data: any) => void;
}

export function ProfileEditForm({ user, onCancel, onSave }: ProfileEditFormProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      username: user.username,
      bio: user.bio ?? '',
      avatar_url: user.avatar_url ?? '',
      gender: user.gender ?? '',
      age_range: user.age_range ?? '',
      interests: user.interests?.join(', ') ?? '',
      phone: user.phone ?? '',
      dob: user.dob ?? '',
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSave)}
      className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-6 space-y-4"
    >
      <h2 className="text-base font-bold text-on-surface">Edit Profile</h2>

      <Input
        label="Username"
        {...register('username', { required: 'Username is required' })}
        error={errors.username?.message}
      />
      <Textarea
        label="Bio"
        placeholder="Tell the community about yourself…"
        {...register('bio')}
        className="min-h-[80px]"
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Gender"
          placeholder="e.g. Female, Male, Non-binary"
          {...register('gender')}
        />
        <Input
          label="Age Range"
          placeholder="e.g. 18-24"
          {...register('age_range')}
        />
      </div>
      <Input
        label="Interests (comma separated)"
        placeholder="coding, design, coffee"
        {...register('interests')}
      />
      <div className="pt-4 border-t border-border mt-4">
        <h3 className="font-label-md text-label-md font-bold mb-3 text-on-surface">Private Details (Only visible to you)</h3>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Phone Number"
            type="tel"
            placeholder="555-0101"
            {...register('phone')}
          />
          <Input
            label="Date of Birth"
            type="date"
            {...register('dob')}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2 border-t border-outline-variant">
        <Button variant="secondary" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          Save Changes
        </Button>
      </div>
    </form>
  );
}
