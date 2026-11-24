-- ========================================================
-- SanadTube (سندتيوب) — Full Supabase PostgreSQL Schema
-- Version: 1.0 (MVP)
-- ========================================================

-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- 1. Roles & Permissions (RBAC)
create table if not exists public.roles (
    id uuid primary key default uuid_generate_v4(),
    name text unique not null,
    display_name text not null,
    description text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

insert into public.roles (name, display_name, description) values
    ('guest', 'زائر', 'استعراض الصفحات العامة فقط'),
    ('user', 'مستخدم', 'إدارة الملف الشخصي'),
    ('creator', 'صانع محتوى', 'ربط القنوات وإنشاء التعاونات والمراجعات'),
    ('pro_creator', 'صانع محتوى محترف', 'ميزات متقدمة وتحليلات موسعة'),
    ('moderator', 'مشرف مجتمعي', 'مراجعة البلاغات وإدارة المحتوى المخالف'),
    ('support', 'دعم فني', 'مساعدة المستخدمين وتتبع الشكاوى'),
    ('admin', 'مدير النظام', 'إدارة عامة للمنصة والمستخدمين'),
    ('super_admin', 'المدير العام', 'إدارة الإعدادات والصلاحيات الحساسة')
on conflict (name) do nothing;

-- 2. User Profiles
create table if not exists public.profiles (
    id uuid primary key references auth.users on delete cascade,
    email text unique not null,
    full_name text not null,
    display_name text,
    avatar_url text,
    bio text,
    country text default 'SA',
    role_name text default 'creator' references public.roles(name),
    points_balance integer default 100 check (points_balance >= 0),
    level integer default 1,
    tier text default 'Free' check (tier in ('Free', 'Starter', 'Pro', 'Creator')),
    is_verified boolean default false,
    is_banned boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. YouTube Channels
create table if not exists public.channels (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references public.profiles(id) on delete cascade not null,
    youtube_channel_id text unique not null,
    title text not null,
    custom_url text,
    description text,
    thumbnail_url text,
    banner_url text,
    country text,
    published_at timestamp with time zone,
    category text default 'Entertainment',
    language text default 'ar',
    
    -- Metrics
    subscriber_count bigint default 0,
    video_count integer default 0,
    view_count bigint default 0,
    watch_time_hours numeric(12,2) default 0,
    avg_view_duration_seconds numeric(8,2) default 0,
    retention_rate numeric(5,2) default 0,

    -- Monetization Checklist
    is_monetized boolean default false,
    ypp_subscribers_eligible boolean default false,
    ypp_watch_hours_eligible boolean default false,
    community_guidelines_clean boolean default true,
    two_step_verification_active boolean default true,

    is_public boolean default true,
    is_active boolean default true,
    last_synced_at timestamp with time zone default timezone('utc'::text, now()) not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Channel Connections (Encrypted OAuth Tokens)
create table if not exists public.channel_connections (
    id uuid primary key default uuid_generate_v4(),
    channel_id uuid references public.channels(id) on delete cascade unique not null,
    user_id uuid references public.profiles(id) on delete cascade not null,
    access_token_encrypted text not null,
    refresh_token_encrypted text not null,
    token_expires_at timestamp with time zone not null,
    granted_scopes text[] not null,
    status text default 'connected' check (status in ('connected', 'expired', 'revoked')),
    last_verified_at timestamp with time zone default timezone('utc'::text, now()) not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Channel Historical Metrics
create table if not exists public.channel_metrics (
    id uuid primary key default uuid_generate_v4(),
    channel_id uuid references public.channels(id) on delete cascade not null,
    metric_date date not null,
    subscribers_gained integer default 0,
    views_count bigint default 0,
    watch_time_hours numeric(10,2) default 0,
    avg_duration_seconds numeric(8,2) default 0,
    traffic_sources jsonb default '{}'::jsonb,
    audience_demographics jsonb default '{}'::jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(channel_id, metric_date)
);

-- 6. Videos
create table if not exists public.videos (
    id uuid primary key default uuid_generate_v4(),
    channel_id uuid references public.channels(id) on delete cascade not null,
    youtube_video_id text unique not null,
    title text not null,
    description text,
    thumbnail_url text,
    duration_seconds integer default 0,
    published_at timestamp with time zone not null,
    view_count bigint default 0,
    like_count integer default 0,
    comment_count integer default 0,
    watch_time_hours numeric(10,2) default 0,
    retention_rate numeric(5,2) default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. Collaborations
create table if not exists public.collaborations (
    id uuid primary key default uuid_generate_v4(),
    requester_id uuid references public.profiles(id) on delete cascade not null,
    requester_channel_id uuid references public.channels(id) on delete cascade not null,
    target_id uuid references public.profiles(id) on delete cascade not null,
    target_channel_id uuid references public.channels(id) on delete cascade not null,
    collab_type text not null check (collab_type in ('joint_video', 'guest_appearance', 'podcast_interview', 'cross_promotion', 'skill_exchange')),
    title text not null,
    description text not null,
    target_audience text,
    deliverables text,
    status text default 'pending' check (status in ('pending', 'accepted', 'in_progress', 'completed', 'declined', 'cancelled')),
    rating_by_requester integer check (rating_by_requester between 1 and 5),
    rating_by_target integer check (rating_by_target between 1 and 5),
    feedback_notes text,
    completed_at timestamp with time zone,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 8. Collaboration Messages / Notes
create table if not exists public.collaboration_messages (
    id uuid primary key default uuid_generate_v4(),
    collaboration_id uuid references public.collaborations(id) on delete cascade not null,
    sender_id uuid references public.profiles(id) on delete cascade not null,
    message text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 9. Community Content Reviews (Thumbnails / Titles / Scripts)
create table if not exists public.reviews (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references public.profiles(id) on delete cascade not null,
    channel_id uuid references public.channels(id) on delete cascade not null,
    title text not null,
    review_type text not null check (review_type in ('thumbnail', 'title_hook', 'video_intro', 'description_seo')),
    content_url text,
    thumbnail_preview_url text,
    notes text not null,
    status text default 'open' check (status in ('open', 'completed', 'closed')),
    points_reward integer default 25,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 10. Review Comments / Feedback
create table if not exists public.review_comments (
    id uuid primary key default uuid_generate_v4(),
    review_id uuid references public.reviews(id) on delete cascade not null,
    reviewer_id uuid references public.profiles(id) on delete cascade not null,
    rating integer not null check (rating between 1 and 5),
    strengths text not null,
    improvements text not null,
    actionable_tip text,
    is_helpful boolean,
    points_awarded integer default 25,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 11. Immutable Points Ledger (Financial-grade auditing)
create table if not exists public.points_ledger (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references public.profiles(id) on delete cascade not null,
    amount integer not null, -- positive for credits, negative for debits
    balance_after integer not null,
    transaction_type text not null check (transaction_type in ('review_completed', 'feedback_given', 'collab_success', 'streak_bonus', 'review_requested', 'admin_adjustment', 'welcome_bonus')),
    reference_id uuid, -- link to review_id, collaboration_id, etc.
    description text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 12. Badges & Gamification
create table if not exists public.badges (
    id uuid primary key default uuid_generate_v4(),
    name text unique not null,
    title_ar text not null,
    description_ar text not null,
    icon_name text not null,
    criteria text not null,
    points_bonus integer default 50,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

insert into public.badges (name, title_ar, description_ar, icon_name, criteria) values
    ('starter_creator', 'بداية واعدة', 'ربط أول قناة يوتيوب موثقة بنجاح', 'Award', 'connect_channel'),
    ('first_collab', 'روح السند', 'إتمام أول تعاون مشترك مع صانع محتوى آخر', 'Users', 'first_collaboration'),
    ('master_reviewer', 'ناقد محترف', 'تقديم 10 مراجعات إرشادية عالية الجودة للمجتمع', 'CheckCircle', '10_reviews'),
    ('growth_champion', 'سفير النمو', 'تحقيق 1,000 ساعة مشاهدة إضافية ومساعدة زملائك', 'TrendingUp', 'growth_milestone'),
    ('verified_partner', 'شريك موثق', 'الوصول إلى معايير برنامج شركاء يوتيوب', 'ShieldCheck', 'ypp_eligible')
on conflict (name) do nothing;

create table if not exists public.user_badges (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references public.profiles(id) on delete cascade not null,
    badge_id uuid references public.badges(id) on delete cascade not null,
    awarded_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(user_id, badge_id)
);

-- 13. Notifications
create table if not exists public.notifications (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references public.profiles(id) on delete cascade not null,
    title text not null,
    content text not null,
    type text not null check (type in ('collab_request', 'collab_update', 'review_received', 'points_earned', 'badge_unlocked', 'system_alert')),
    link_url text,
    is_read boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 14. Reports & Moderation
create table if not exists public.reports (
    id uuid primary key default uuid_generate_v4(),
    reporter_id uuid references public.profiles(id) on delete set null,
    target_user_id uuid references public.profiles(id) on delete cascade,
    target_channel_id uuid references public.channels(id) on delete cascade,
    reason text not null,
    details text,
    status text default 'pending' check (status in ('pending', 'investigating', 'resolved', 'dismissed')),
    resolved_by uuid references public.profiles(id) on delete set null,
    action_taken text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 15. Audit Logs
create table if not exists public.audit_logs (
    id uuid primary key default uuid_generate_v4(),
    actor_id uuid references public.profiles(id) on delete set null,
    action text not null,
    target_entity text not null,
    target_id uuid,
    details jsonb default '{}'::jsonb,
    ip_address text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 16. Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.channels enable row level security;
alter table public.channel_connections enable row level security;
alter table public.collaborations enable row level security;
alter table public.reviews enable row level security;
alter table public.review_comments enable row level security;
alter table public.points_ledger enable row level security;
alter table public.notifications enable row level security;

-- Profiles: Public can read profiles, user can update their own
create policy "Public can view public profiles" on public.profiles for select using (true);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- Channels: Public can view active channels
create policy "Public can view active channels" on public.channels for select using (is_public = true and is_active = true);
create policy "Users can manage their channels" on public.channels for all using (auth.uid() = user_id);

-- Channel Connections: strictly owner only
create policy "Owner only for oauth connections" on public.channel_connections for all using (auth.uid() = user_id);

-- Collaborations: participant visibility
create policy "Participants can view and update collab" on public.collaborations for all using (auth.uid() = requester_id or auth.uid() = target_id);

-- Reviews: Public can view, owner can update
create policy "Public can view reviews" on public.reviews for select using (true);
create policy "Users can create reviews" on public.reviews for insert with check (auth.uid() = user_id);

-- Notifications: User only
create policy "User can access own notifications" on public.notifications for all using (auth.uid() = user_id);

-- Points Ledger: User can view own ledger
create policy "User can view own points ledger" on public.points_ledger for select using (auth.uid() = user_id);
