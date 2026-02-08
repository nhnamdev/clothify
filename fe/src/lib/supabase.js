// Supabase Client Configuration
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Helper functions for common operations

// ==========================================
// PRODUCTS
// ==========================================

export const getProducts = async (options = {}) => {
  const { category, limit = 20, offset = 0, sortBy = 'created_at' } = options
  
  let query = supabase
    .from('product_details')
    .select('*')
    .eq('is_active', true)
    .order(sortBy, { ascending: false })
    .range(offset, offset + limit - 1)
  
  if (category) {
    query = query.eq('category_slug', category)
  }
  
  const { data, error } = await query
  
  if (error) throw error
  return data
}

export const getProductBySlug = async (slug) => {
  const { data, error } = await supabase
    .from('product_details')
    .select('*')
    .eq('slug', slug)
    .single()
  
  if (error) throw error
  return data
}

export const searchProducts = async (searchQuery) => {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(name)')
    .or(`name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`)
    .eq('is_active', true)
    .limit(20)
  
  if (error) throw error
  return data
}

// ==========================================
// CART
// ==========================================

export const getCart = async (userId) => {
  const { data, error } = await supabase
    .from('cart_items')
    .select(`
      *,
      products(id, name, price, slug),
      product_variants(id, size, color)
    `)
    .eq('user_id', userId)
  
  if (error) throw error
  return data
}

export const addToCart = async (userId, productId, variantId, quantity = 1) => {
  const { data, error } = await supabase
    .from('cart_items')
    .upsert({
      user_id: userId,
      product_id: productId,
      variant_id: variantId,
      quantity
    }, {
      onConflict: 'user_id,product_id,variant_id'
    })
    .select()
  
  if (error) throw error
  return data
}

export const updateCartItem = async (cartItemId, quantity) => {
  const { data, error } = await supabase
    .from('cart_items')
    .update({ quantity })
    .eq('id', cartItemId)
    .select()
  
  if (error) throw error
  return data
}

export const removeFromCart = async (cartItemId) => {
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('id', cartItemId)
  
  if (error) throw error
}

export const clearCart = async (userId) => {
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('user_id', userId)
  
  if (error) throw error
}

// ==========================================
// WISHLIST
// ==========================================

export const getWishlist = async (userId) => {
  const { data, error } = await supabase
    .from('wishlist')
    .select(`
      *,
      products(id, name, price, slug, rating, product_images(image_url))
    `)
    .eq('user_id', userId)
  
  if (error) throw error
  return data
}

export const addToWishlist = async (userId, productId) => {
  const { data, error } = await supabase
    .from('wishlist')
    .insert({
      user_id: userId,
      product_id: productId
    })
    .select()
  
  if (error) throw error
  return data
}

export const removeFromWishlist = async (wishlistId) => {
  const { error } = await supabase
    .from('wishlist')
    .delete()
    .eq('id', wishlistId)
  
  if (error) throw error
}

export const isInWishlist = async (userId, productId) => {
  const { data, error } = await supabase
    .from('wishlist')
    .select('id')
    .eq('user_id', userId)
    .eq('product_id', productId)
    .single()
  
  return !error && data !== null
}

// ==========================================
// ORDERS
// ==========================================

export const createOrder = async (orderData) => {
  const { data, error } = await supabase
    .from('orders')
    .insert(orderData)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export const createOrderItems = async (orderItems) => {
  const { data, error } = await supabase
    .from('order_items')
    .insert(orderItems)
    .select()
  
  if (error) throw error
  return data
}

export const getUserOrders = async (userId) => {
  const { data, error } = await supabase
    .from('order_summary')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

export const getOrderById = async (orderId) => {
  const { data, error } = await supabase
    .from('order_summary')
    .select('*')
    .eq('id', orderId)
    .single()
  
  if (error) throw error
  return data
}

// ==========================================
// USER PROFILE
// ==========================================

export const getProfile = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  
  if (error) throw error
  return data
}

export const updateProfile = async (userId, profileData) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(profileData)
    .eq('id', userId)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// ==========================================
// ADDRESSES
// ==========================================

export const getUserAddresses = async (userId) => {
  const { data, error } = await supabase
    .from('addresses')
    .select('*')
    .eq('user_id', userId)
    .order('is_default', { ascending: false })
  
  if (error) throw error
  return data
}

export const createAddress = async (addressData) => {
  const { data, error } = await supabase
    .from('addresses')
    .insert(addressData)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export const updateAddress = async (addressId, addressData) => {
  const { data, error } = await supabase
    .from('addresses')
    .update(addressData)
    .eq('id', addressId)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export const deleteAddress = async (addressId) => {
  const { error } = await supabase
    .from('addresses')
    .delete()
    .eq('id', addressId)
  
  if (error) throw error
}

export const setDefaultAddress = async (userId, addressId) => {
  // First, remove default from all addresses
  await supabase
    .from('addresses')
    .update({ is_default: false })
    .eq('user_id', userId)
  
  // Then set the new default
  const { data, error } = await supabase
    .from('addresses')
    .update({ is_default: true })
    .eq('id', addressId)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// ==========================================
// REVIEWS
// ==========================================

export const getProductReviews = async (productId) => {
  const { data, error } = await supabase
    .from('reviews')
    .select(`
      *,
      profiles(first_name, last_name, avatar_url)
    `)
    .eq('product_id', productId)
    .eq('is_approved', true)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

export const createReview = async (reviewData) => {
  const { data, error } = await supabase
    .from('reviews')
    .insert(reviewData)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// ==========================================
// CATEGORIES
// ==========================================

export const getCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('display_order')
  
  if (error) throw error
  return data
}

// ==========================================
// STORES
// ==========================================

export const getStores = async () => {
  const { data, error } = await supabase
    .from('stores')
    .select('*')
    .eq('is_active', true)
  
  if (error) throw error
  return data
}

// ==========================================
// AUTH HELPERS
// ==========================================

export const signUp = async (email, password, userData) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData // Will be stored in auth.users.raw_user_meta_data
    }
  })
  
  if (error) throw error
  return data
}

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  
  if (error) throw error
  return data
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw error
  return user
}

export const onAuthStateChange = (callback) => {
  return supabase.auth.onAuthStateChange(callback)
}
